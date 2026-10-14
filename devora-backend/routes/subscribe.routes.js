const crypto = require("crypto");
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Subscriber = require("../models/Subscriber");
const rateLimit = require("../middleware/rateLimit");
const { GUIDE_FILES } = require("../data/guides");
const { sendMailInBackground } = require("../utils/mailer");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE_RE = /^[a-z0-9:_-]{1,60}$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts. Please try again in a few minutes.",
});

function str(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

// Guide download links are signed with a key DERIVED from JWT_SECRET, so a guide token can never
// be accepted as an admin token (the admin middleware verifies with JWT_SECRET itself).
function guideKey() {
  return crypto.createHmac("sha256", String(process.env.JWT_SECRET || "")).update("guide-download").digest("hex");
}

// Save the address (once) and remember which form it came from.
// Returns true when the address is new.
async function saveSubscriber(email, source) {
  const existing = await Subscriber.findOne({ email });
  if (existing) {
    if (!existing.sources.includes(source)) {
      existing.sources.push(source);
      await existing.save();
    }
    return false;
  }
  try {
    await Subscriber.create({ email, sources: [source] });
    return true;
  } catch (err) {
    if (err.code === 11000) return false; // two requests raced: the other one saved it
    throw err;
  }
}

// POST /api/subscribe  { email, source }  — newsletter forms
router.post("/subscribe", limiter, async (req, res) => {
  const body = req.body || {};
  if (str(body.website, 200)) return res.status(201).json({ ok: true }); // honeypot

  const email = str(body.email, 160).toLowerCase();
  const source = SOURCE_RE.test(str(body.source, 60)) ? str(body.source, 60) : "newsletter";
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Please enter a valid email address" });

  try {
    const isNew = await saveSubscriber(email, source);
    if (isNew) {
      sendMailInBackground({
        to: email,
        subject: "You're on the Devora list",
        text: "Thanks for subscribing to Devora. We'll only email you when we publish something worth reading.\n\n— The Devora team",
      });
    }
    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: "Could not save your email. Please try again." });
  }
});

// POST /api/guides/:id/unlock  { email }  — saves the email, returns a short-lived download link
router.post("/guides/:id/unlock", limiter, async (req, res) => {
  const body = req.body || {};
  const file = Object.hasOwn(GUIDE_FILES, req.params.id) ? GUIDE_FILES[req.params.id] : null;
  if (!file) return res.status(404).json({ error: "Guide not found" });

  const email = str(body.email, 160).toLowerCase();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Please enter a valid email address" });

  try {
    await saveSubscriber(email, `guide:${req.params.id}`);
    const token = jwt.sign({ file }, guideKey(), { expiresIn: "15m" });
    res.json({ downloadUrl: `/api/guides/download?token=${encodeURIComponent(token)}` });
  } catch {
    res.status(500).json({ error: "Could not unlock the download. Please try again." });
  }
});

// GET /api/guides/download?token=...
router.get("/guides/download", (req, res) => {
  let file;
  try {
    ({ file } = jwt.verify(String(req.query.token || ""), guideKey()));
  } catch {
    return res.status(403).json({ error: "This download link has expired. Please request it again." });
  }
  // only ever serve a file that is on the allow-list
  if (!Object.values(GUIDE_FILES).includes(file)) return res.status(404).json({ error: "Not found" });

  res.download(path.join(__dirname, "..", "private", "guides", file), file, (err) => {
    if (err && !res.headersSent) res.status(404).json({ error: "File not found" });
  });
});

module.exports = router;
