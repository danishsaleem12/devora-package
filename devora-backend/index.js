require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Behind a host's proxy (Render, Railway, Fly...) req.ip would be the proxy's address for everyone;
// this makes it the real visitor IP so the form rate limiter works per person.
app.set("trust proxy", 1);

// CORS: FRONTEND_URL can hold several origins separated by commas, e.g.
//   FRONTEND_URL=https://devora.com,https://www.devora.com,http://localhost:3000
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header = server-to-server / curl / health checks: allow
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);
app.use(express.json({ limit: "100kb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    // One-time backfill: jobs created before the "stage" field existed get a sensible stage so the
    // /careers/roles?stage=... links work. Does nothing once every job has a stage.
    try {
      const Job = require("./models/Job");
      const missing = await Job.collection.find({ stage: { $exists: false } }).toArray();
      for (const job of missing) {
        await Job.collection.updateOne({ _id: job._id }, { $set: { stage: Job.inferStage(job) } });
      }
      if (missing.length) console.log(`Backfilled career stage on ${missing.length} job(s)`);
    } catch (err) {
      console.error("Stage backfill skipped:", err.message);
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple test route to prove frontend <-> backend connection works
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Devora backend!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Devora backend is running.");
});

// Language support: any /api response is translated when the request has ?lang=fr|es
// (catalogs live in ./i18n/translations). Without ?lang the API answers in English as before.
const { i18nMiddleware } = require("./i18n");
app.use("/api", i18nMiddleware);
app.use("/api", require("./routes/i18n.routes"));

// Public content routes (GET /api/navbar, /api/hero, /api/journal-article, /api/podcast-index, ...)
const contentRoutes = require("./routes/content.routes");
app.use("/api", contentRoutes);

// Detail pages for blog posts, podcast episodes, press releases and case studies (GET /api/resources/:type/:id)
app.use("/api", require("./routes/resources.routes"));

// Journal essays (GET /api/journal-articles, GET /api/journal-article[/:slug])
app.use("/api", require("./routes/journal.routes"));

// Newsletter signups and gated research-guide downloads (POST /api/subscribe, /api/guides/:id/unlock)
app.use("/api", require("./routes/subscribe.routes"));

// Auth routes (POST /api/auth/login)
const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

// Jobs routes (GET/POST/PUT/DELETE /api/jobs)
const jobsRoutes = require("./routes/jobs.routes");
app.use("/api", jobsRoutes);

// Form routes (POST /api/contact, POST /api/applications + admin read routes)
const formsRoutes = require("./routes/forms.routes");
app.use("/api", formsRoutes);

// Error handler (CORS rejections, bad JSON)
app.use((err, req, res, next) => {
  if (String(err.message).includes("CORS")) return res.status(403).json({ error: "Origin not allowed" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Devora backend listening on http://localhost:${PORT}`);
});