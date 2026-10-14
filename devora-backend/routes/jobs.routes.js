const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/Job");
const requireAuth = require("../middleware/auth");

// Only these fields can ever be written from a request body.
// (Stops clients from setting _id, createdAt, __v, or any unknown field.)
const ALLOWED_FIELDS = [
  "slug",
  "title",
  "department",
  "workplaceType",
  "type",
  "location",
  "postedAgo",
  "category",
  "stage",
  "description",
  "responsibilities",
  "requirements",
  "isOpen",
];

function pickAllowed(body = {}) {
  const out = {};
  for (const key of ALLOWED_FIELDS) {
    if (body[key] !== undefined) out[key] = body[key];
  }

  // Clean up string lists: trim, drop blanks, cap size
  for (const key of ["responsibilities", "requirements"]) {
    if (out[key] !== undefined) {
      if (!Array.isArray(out[key])) {
        out[key] = [];
      } else {
        out[key] = out[key]
          .filter((s) => typeof s === "string")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 30);
      }
    }
  }

  if (out.isOpen !== undefined) out.isOpen = out.isOpen === true || out.isOpen === "true";

  // Any non-array field must be a plain string/boolean, never an object (blocks operator injection)
  for (const [k, v] of Object.entries(out)) {
    if (k === "responsibilities" || k === "requirements" || k === "isOpen") continue;
    if (typeof v !== "string") out[k] = String(v ?? "");
  }
  return out;
}

function validationMessage(err) {
  if (err.name === "ValidationError") {
    return Object.values(err.errors).map((e) => e.message).join(", ");
  }
  if (err.code === 11000) return "A job with this slug already exists";
  return err.message;
}

function requireValidId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }
  next();
}

// GET /api/admin/jobs — returns ALL jobs, open and closed (admin only)
router.get("/admin/jobs", requireAuth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Could not load jobs" });
  }
});

// GET /api/jobs — returns all open jobs (public)
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({ isOpen: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Could not load jobs" });
  }
});

// GET /api/jobs/:slug — returns one job by slug (public)
router.get("/jobs/:slug", async (req, res) => {
  try {
    const job = await Job.findOne({ slug: String(req.params.slug) });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Could not load job" });
  }
});

// POST /api/jobs — create a new job (admin only)
router.post("/jobs", requireAuth, async (req, res) => {
  try {
    const job = await Job.create(pickAllowed(req.body));
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: validationMessage(err) });
  }
});

// PUT /api/jobs/:id — edit an existing job (admin only)
router.put("/jobs/:id", requireAuth, requireValidId, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { $set: pickAllowed(req.body) }, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: validationMessage(err) });
  }
});

// DELETE /api/jobs/:id — permanently remove a job (admin only)
router.delete("/jobs/:id", requireAuth, requireValidId, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted", job });
  } catch (err) {
    res.status(500).json({ error: "Could not delete job" });
  }
});

module.exports = router;
