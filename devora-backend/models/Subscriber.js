const mongoose = require("mongoose");

// Newsletter signups and research-guide downloads. One document per email address;
// `sources` lists every form that address used (e.g. "newsletter-blog", "guide:design-system-playbook").
const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 160 },
    sources: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
