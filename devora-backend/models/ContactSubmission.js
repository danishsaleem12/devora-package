const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, trim: true, maxlength: 80, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    company: { type: String, required: true, trim: true, maxlength: 140 },
    lookingFor: { type: String, required: true, trim: true, maxlength: 80 },
    message: { type: String, trim: true, maxlength: 3000, default: "" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSubmission", contactSubmissionSchema);
