const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const requireAuth = require("../middleware/auth");

// GET /api/admin/jobs — returns ALL jobs, open and closed (admin only)
router.get("/admin/jobs", requireAuth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs — returns all open jobs (public)
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({ isOpen: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/:slug — returns one job by slug (public)
router.get("/jobs/:slug", async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/jobs — create a new job (admin only)
router.post("/jobs", requireAuth, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/jobs/:id — edit an existing job (admin only)
router.put("/jobs/:id", requireAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/jobs/:id — permanently remove a job (admin only)
router.delete("/jobs/:id", requireAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;