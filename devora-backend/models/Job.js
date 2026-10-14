const mongoose = require("mongoose");

const WORKPLACE_TYPES = ["On-site", "Hybrid", "Remote"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const CATEGORIES = ["Engineering", "AI & Data", "Design", "Cloud & DevOps"];
// Career stage, used by the /careers/roles?stage=... links
const STAGES = ["graduate", "experienced", "leadership"];

const jobSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only contain lowercase letters, numbers and hyphens"],
      maxlength: 120,
    },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    workplaceType: { type: String, required: true, enum: WORKPLACE_TYPES },
    type: { type: String, required: true, enum: JOB_TYPES },
    location: { type: String, required: true, trim: true, maxlength: 140 },
    postedAgo: { type: String, trim: true, maxlength: 60 }, // e.g. "Posted 2 days ago" (or compute from createdAt)
    category: { type: String, trim: true, enum: CATEGORIES },
    stage: { type: String, trim: true, enum: STAGES, default: "experienced" },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Best-guess stage for a job that has none yet (used once, by the startup backfill in index.js).
function inferStage({ title = "", type = "" } = {}) {
  if (type === "Internship" || /\b(intern|graduate|junior|associate|trainee|apprentice)\b/i.test(title)) return "graduate";
  if (/\b(lead|head|director|principal|vp|chief|manager)\b/i.test(title)) return "leadership";
  return "experienced";
}

module.exports = mongoose.model("Job", jobSchema);
module.exports.WORKPLACE_TYPES = WORKPLACE_TYPES;
module.exports.JOB_TYPES = JOB_TYPES;
module.exports.CATEGORIES = CATEGORIES;
module.exports.STAGES = STAGES;
module.exports.inferStage = inferStage;
