const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // Which job this is for. jobTitle is a snapshot so it survives the job being edited/deleted.
    jobSlug: { type: String, required: true, trim: true, index: true },
    jobTitle: { type: String, required: true, trim: true, maxlength: 140 },

    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    address: { type: String, required: true, trim: true, maxlength: 200 },

    // The CV itself is stored in the ResumeFile collection; here we keep its name and whether one exists.
    resumeFileName: { type: String, trim: true, maxlength: 200, default: "" },
    hasResume: { type: Boolean, default: false },

    // Optional extras from the "Profile" section of the application form
    education: { type: String, trim: true, maxlength: 1500, default: "" },
    workHistory: { type: String, trim: true, maxlength: 1500, default: "" },

    willingToWorkOnsite: { type: String, enum: ["Yes", "No"], required: true },
    experience: { type: String, required: true, trim: true, maxlength: 500 },
    projectDescription: { type: String, required: true, trim: true, maxlength: 3000 },

    status: { type: String, enum: ["new", "reviewed", "rejected", "hired"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
