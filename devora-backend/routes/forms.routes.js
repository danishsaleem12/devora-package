const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const ContactSubmission = require("../models/ContactSubmission");
const Application = require("../models/Application");
const ResumeFile = require("../models/ResumeFile");
const Job = require("../models/Job");
const Subscriber = require("../models/Subscriber");
const { notifyAdmin, sendMailInBackground, adminUrl } = require("../utils/mailer");
const requireAuth = require("../middleware/auth");
const rateLimit = require("../middleware/rateLimit");
const { sendCsv } = require("../utils/csv");

// 5 submissions per IP per 15 minutes, per form
const formLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many submissions. Please try again in a few minutes.",
  });

// ---- CV upload ----
// Multipart form with an optional "resume" file (PDF / DOC / DOCX, max 5 MB), held in memory then saved to MongoDB.
const multer = require("multer");
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = {
  ".pdf": { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  ".doc": { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2 container
  ".docx": {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b], // zip ("PK")
  },
};
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_RESUME_BYTES, files: 1, fields: 30 } });

function resumeExt(name) {
  const m = /\.[a-z0-9]+$/i.exec(String(name || ""));
  return m ? m[0].toLowerCase() : "";
}

// Check extension AND the file's first bytes, so a renamed .exe can't be stored as "cv.pdf"
function validResume(file) {
  const type = RESUME_TYPES[resumeExt(file.originalname)];
  if (!type || !file.buffer || file.buffer.length < 4) return null;
  return type.magic.every((b, i) => file.buffer[i] === b) ? type : null;
}

function uploadResume(req, res, next) {
  upload.single("resume")(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ error: "Your resume is too large. The limit is 5 MB." });
    return res.status(400).json({ error: "Could not read your upload. Please try again." });
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Only plain strings are accepted (blocks objects / operator injection), trimmed and length-capped.
function str(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function requireValidId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
  next();
}

function validationMessage(err) {
  if (err.name === "ValidationError") {
    return Object.values(err.errors).map((e) => e.message).join(", ");
  }
  return "Could not save your submission";
}

// POST /api/contact — public contact form
router.post("/contact", formLimiter(), async (req, res) => {
  const body = req.body || {};

  // Honeypot: real visitors never see/fill this field, bots do. Pretend success and drop it.
  if (str(body.website, 200)) return res.status(201).json({ ok: true });

  const data = {
    firstName: str(body.firstName, 80),
    lastName: str(body.lastName, 80),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    company: str(body.company, 140),
    lookingFor: str(body.lookingFor, 80),
    message: str(body.message, 3000),
  };

  if (!data.firstName || !data.company || !data.lookingFor) {
    return res.status(400).json({ error: "Please fill in all required fields" });
  }
  if (!EMAIL_RE.test(data.email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  try {
    await ContactSubmission.create(data);
    res.status(201).json({ ok: true });

    // emails are sent in the background; a mail problem never affects the visitor's request
    notifyAdmin(
      `New contact message from ${data.firstName} (${data.company})`,
      [
        `Name: ${data.firstName} ${data.lastName}`.trim(),
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Company: ${data.company}`,
        `Looking for: ${data.lookingFor}`,
        "",
        data.message || "(no message)",
        "",
        `Open the inbox: ${adminUrl("/admin/inbox")}`,
      ].filter((l) => l !== null).join("\n"),
      data.email
    );
    sendMailInBackground({
      to: data.email,
      subject: "We got your message",
      text: `Hi ${data.firstName},\n\nThanks for reaching out to Devora. We received your message and will get back to you within a business day.\n\n— The Devora team`,
    });
  } catch (err) {
    res.status(err.name === "ValidationError" ? 400 : 500).json({ error: validationMessage(err) });
  }
});

// POST /api/applications — public job application
router.post("/applications", formLimiter(), uploadResume, async (req, res) => {
  const body = req.body || {};

  if (str(body.website, 200)) return res.status(201).json({ ok: true }); // honeypot

  const jobSlug = str(body.jobSlug, 120);
  if (!jobSlug) return res.status(400).json({ error: "Missing job" });

  try {
    const job = await Job.findOne({ slug: jobSlug, isOpen: true });
    if (!job) return res.status(404).json({ error: "This role is no longer open" });

    const data = {
      jobSlug: job.slug,
      jobTitle: job.title,
      firstName: str(body.firstName, 80),
      lastName: str(body.lastName, 80),
      email: str(body.email, 160),
      phone: str(body.phone, 40),
      address: str(body.address, 200),
      resumeFileName: str(body.resumeFileName, 200),
      education: str(body.education, 1500),
      workHistory: str(body.workHistory, 1500),
      willingToWorkOnsite: str(body.willingToWorkOnsite, 3),
      experience: str(body.experience, 500),
      projectDescription: str(body.projectDescription, 3000),
    };

    if (
      !data.firstName || !data.lastName || !data.address ||
      !data.willingToWorkOnsite || !data.experience || !data.projectDescription
    ) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }
    if (!EMAIL_RE.test(data.email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    // Optional CV. Checked before anything is saved so a bad file never leaves a half-created application.
    let resumeType = null;
    if (req.file) {
      resumeType = validResume(req.file);
      if (!resumeType) return res.status(400).json({ error: "Please upload your resume as a PDF, DOC or DOCX file." });
      data.resumeFileName = str(req.file.originalname, 200);
      data.hasResume = true;
    } else {
      data.resumeFileName = "";
    }

    const application = await Application.create(data);
    if (req.file) {
      try {
        await ResumeFile.create({
          application: application._id,
          fileName: data.resumeFileName,
          contentType: resumeType.mime,
          size: req.file.size,
          data: req.file.buffer,
        });
      } catch (err) {
        await Application.findByIdAndDelete(application._id).catch(() => {});
        throw err;
      }
    }
    res.status(201).json({ ok: true });

    notifyAdmin(
      `New application: ${data.firstName} ${data.lastName} for ${job.title}`,
      [
        `Role: ${job.title}`,
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Resume: ${data.hasResume ? data.resumeFileName : "not provided"}`,
        "",
        `Review it: ${adminUrl("/admin/inbox")}`,
      ].filter((l) => l !== null).join("\n"),
      data.email
    );
    sendMailInBackground({
      to: data.email,
      subject: `We received your application for ${job.title}`,
      text: `Hi ${data.firstName},\n\nThanks for applying for ${job.title} at Devora. Our team will review your application and reach out if it's a fit.\n\n— The Devora team`,
    });
  } catch (err) {
    res.status(err.name === "ValidationError" ? 400 : 500).json({ error: validationMessage(err) });
  }
});

// ---- Admin (JWT required): read what people submitted ----
//
// The list routes are paginated and searchable, and answer with
//   { items, total, page, pages, limit }
// Query string (all optional):
//   page, limit (1-100, default 25)   which slice to return
//   q                                 search text; every word must appear in at least one searched field
//   unread=1                          (messages)      only unread
//   status=new|reviewed|...           (applications)  only that status
//   job=<slug>                        (applications)  only that job
// The matching /admin/export/*.csv routes take the same filters and return EVERYTHING that matches
// (not just one page), streamed so large exports don't have to fit in memory.

const APPLICATION_STATUSES = ["new", "reviewed", "rejected", "hired"];
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;
const MAX_SEARCH_WORDS = 6;

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// "jane acme" -> every word must match one of `fields` (so a first name and a company can be combined).
// Words are escaped, so visitors' regex characters (or a hostile ?q=) can never become a pattern.
function searchFilter(q, fields) {
  const words = (typeof q === "string" ? q : "")
    .trim()
    .slice(0, 100)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_SEARCH_WORDS);
  if (!words.length) return null;
  return {
    $and: words.map((word) => {
      const rx = new RegExp(escapeRegex(word), "i");
      return { $or: fields.map((field) => ({ [field]: rx })) };
    }),
  };
}

function combine(...parts) {
  const real = parts.filter(Boolean);
  if (!real.length) return {};
  return real.length === 1 ? real[0] : { $and: real };
}

function pageParams(query) {
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT));
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  return { page, limit };
}

async function paginate(Model, filter, { page, limit }) {
  const total = await Model.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(total / limit));
  const current = Math.min(page, pages); // asking for a page past the end (e.g. after deleting the last row) gives the last page
  const items = await Model.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .skip((current - 1) * limit)
    .limit(limit);
  return { items, total, page: current, pages, limit };
}

const isTrue = (v) => v === "1" || v === "true";

const MESSAGE_SEARCH_FIELDS = ["firstName", "lastName", "email", "phone", "company", "lookingFor", "message"];
const APPLICATION_SEARCH_FIELDS = [
  "firstName", "lastName", "email", "phone", "address", "jobTitle", "jobSlug",
  "resumeFileName", "education", "workHistory", "experience", "projectDescription",
];
const SUBSCRIBER_SEARCH_FIELDS = ["email", "sources"];

function messageFilter(query) {
  return combine(isTrue(query.unread) ? { isRead: false } : null, searchFilter(query.q, MESSAGE_SEARCH_FIELDS));
}

function applicationFilter(query) {
  const status = typeof query.status === "string" && APPLICATION_STATUSES.includes(query.status) ? { status: query.status } : null;
  const job = typeof query.job === "string" && query.job ? { jobSlug: query.job } : null;
  return combine(status, job, searchFilter(query.q, APPLICATION_SEARCH_FIELDS));
}

function subscriberFilter(query) {
  return combine(searchFilter(query.q, SUBSCRIBER_SEARCH_FIELDS));
}

const today = () => new Date().toISOString().slice(0, 10);

async function streamExport(res, filename, columns, cursor) {
  try {
    await sendCsv(res, filename, columns, cursor);
  } catch {
    // headers may already be on the wire; the best we can do then is end the (truncated) file
    if (!res.headersSent) res.status(500).json({ error: "Could not export submissions" });
    else res.end();
  }
}

// GET /api/admin/inbox-counts — the badges on the tabs (they must not depend on which page is loaded)
router.get("/admin/inbox-counts", requireAuth, async (req, res) => {
  try {
    const [unreadMessages, totalMessages, newApplications, totalApplications, subscribers] = await Promise.all([
      ContactSubmission.countDocuments({ isRead: false }),
      ContactSubmission.countDocuments({}),
      Application.countDocuments({ status: "new" }),
      Application.countDocuments({}),
      Subscriber.countDocuments({}),
    ]);
    res.json({ unreadMessages, totalMessages, newApplications, totalApplications, subscribers });
  } catch {
    res.status(500).json({ error: "Could not load submissions" });
  }
});

// GET /api/admin/contact-submissions  (?page &limit &q &unread=1)
router.get("/admin/contact-submissions", requireAuth, async (req, res) => {
  try {
    res.json(await paginate(ContactSubmission, messageFilter(req.query), pageParams(req.query)));
  } catch {
    res.status(500).json({ error: "Could not load submissions" });
  }
});

// GET /api/admin/export/contact-submissions.csv  (same filters as the list)
router.get("/admin/export/contact-submissions.csv", requireAuth, async (req, res) => {
  const cursor = ContactSubmission.find(messageFilter(req.query)).sort({ createdAt: -1, _id: -1 }).lean().cursor();
  await streamExport(
    res,
    `devora-messages-${today()}.csv`,
    [
      { header: "Received", value: (d) => d.createdAt },
      { header: "First name", value: (d) => d.firstName },
      { header: "Last name", value: (d) => d.lastName },
      { header: "Email", value: (d) => d.email },
      { header: "Phone", value: (d) => d.phone },
      { header: "Company", value: (d) => d.company },
      { header: "Looking for", value: (d) => d.lookingFor },
      { header: "Message", value: (d) => d.message },
      { header: "Read", value: (d) => (d.isRead ? "yes" : "no") },
    ],
    cursor
  );
});

// PUT /api/admin/contact-submissions/:id  { isRead }
router.put("/admin/contact-submissions/:id", requireAuth, requireValidId, async (req, res) => {
  const isRead = req.body && (req.body.isRead === true || req.body.isRead === "true");
  try {
    const doc = await ContactSubmission.findByIdAndUpdate(req.params.id, { $set: { isRead } }, { new: true });
    if (!doc) return res.status(404).json({ error: "Message not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Could not update message" });
  }
});

// DELETE /api/admin/contact-submissions/:id
router.delete("/admin/contact-submissions/:id", requireAuth, requireValidId, async (req, res) => {
  try {
    const doc = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch {
    res.status(500).json({ error: "Could not delete message" });
  }
});

// GET /api/admin/applications  (?page &limit &q &status &job)
router.get("/admin/applications", requireAuth, async (req, res) => {
  try {
    res.json(await paginate(Application, applicationFilter(req.query), pageParams(req.query)));
  } catch {
    res.status(500).json({ error: "Could not load applications" });
  }
});

// GET /api/admin/export/applications.csv  (same filters as the list)
router.get("/admin/export/applications.csv", requireAuth, async (req, res) => {
  const cursor = Application.find(applicationFilter(req.query)).sort({ createdAt: -1, _id: -1 }).lean().cursor();
  await streamExport(
    res,
    `devora-applications-${today()}.csv`,
    [
      { header: "Received", value: (d) => d.createdAt },
      { header: "Job", value: (d) => d.jobTitle },
      { header: "Job slug", value: (d) => d.jobSlug },
      { header: "Status", value: (d) => d.status },
      { header: "First name", value: (d) => d.firstName },
      { header: "Last name", value: (d) => d.lastName },
      { header: "Email", value: (d) => d.email },
      { header: "Phone", value: (d) => d.phone },
      { header: "Address", value: (d) => d.address },
      { header: "Willing to work on-site", value: (d) => d.willingToWorkOnsite },
      { header: "Years of experience", value: (d) => d.experience },
      { header: "Education", value: (d) => d.education },
      { header: "Work history", value: (d) => d.workHistory },
      { header: "Relevant project", value: (d) => d.projectDescription },
      { header: "Resume file", value: (d) => (d.hasResume ? d.resumeFileName : "") },
    ],
    cursor
  );
});

// PUT /api/admin/applications/:id  { status }
router.put("/admin/applications/:id", requireAuth, requireValidId, async (req, res) => {
  const status = str(req.body && req.body.status, 20);
  if (!APPLICATION_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  try {
    const doc = await Application.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
    if (!doc) return res.status(404).json({ error: "Application not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Could not update application" });
  }
});

// GET /api/admin/applications/:id/resume — the uploaded CV (admin only; the frontend fetches it with the token)
router.get("/admin/applications/:id/resume", requireAuth, requireValidId, async (req, res) => {
  try {
    const file = await ResumeFile.findOne({ application: req.params.id });
    if (!file) return res.status(404).json({ error: "No resume uploaded for this application" });
    res.set({
      "Content-Type": file.contentType,
      "Content-Length": String(file.data.length),
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
      "X-Content-Type-Options": "nosniff",
    });
    res.send(file.data);
  } catch {
    res.status(500).json({ error: "Could not load the resume" });
  }
});

// DELETE /api/admin/applications/:id
router.delete("/admin/applications/:id", requireAuth, requireValidId, async (req, res) => {
  try {
    const doc = await Application.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Application not found" });
    await ResumeFile.deleteOne({ application: doc._id });
    res.json({ message: "Application deleted" });
  } catch {
    res.status(500).json({ error: "Could not delete application" });
  }
});

// GET /api/admin/subscribers  (?page &limit &q) — newsletter signups and gated-guide downloads
router.get("/admin/subscribers", requireAuth, async (req, res) => {
  try {
    res.json(await paginate(Subscriber, subscriberFilter(req.query), pageParams(req.query)));
  } catch {
    res.status(500).json({ error: "Could not load subscribers" });
  }
});

// GET /api/admin/export/subscribers.csv  (?q)
router.get("/admin/export/subscribers.csv", requireAuth, async (req, res) => {
  const cursor = Subscriber.find(subscriberFilter(req.query)).sort({ createdAt: -1, _id: -1 }).lean().cursor();
  await streamExport(
    res,
    `devora-subscribers-${today()}.csv`,
    [
      { header: "Email", value: (d) => d.email },
      { header: "Sources", value: (d) => (d.sources || []).join("; ") },
      { header: "Subscribed", value: (d) => d.createdAt },
    ],
    cursor
  );
});

// DELETE /api/admin/subscribers/:id — e.g. when someone asks to be removed from the list
router.delete("/admin/subscribers/:id", requireAuth, requireValidId, async (req, res) => {
  try {
    const doc = await Subscriber.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Subscriber not found" });
    res.json({ message: "Subscriber deleted" });
  } catch {
    res.status(500).json({ error: "Could not delete subscriber" });
  }
});

module.exports = router;
