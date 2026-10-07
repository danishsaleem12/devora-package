const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    workplaceType: { type: String, required: true }, // "On-site" | "Hybrid" | "Remote"
    type: { type: String, required: true }, // "Full-time" | "Contract"
    location: { type: String, required: true },
    postedAgo: { type: String }, // e.g. "Posted 2 days ago" — or we can compute this from createdAt
    category: { type: String }, // "Engineering" | "AI & Data" | "Design" | "Cloud & DevOps"
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);