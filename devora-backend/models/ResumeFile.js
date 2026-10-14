const mongoose = require("mongoose");

// Uploaded CVs are kept in MongoDB (max 5 MB each) instead of on disk, so they survive on hosts
// with an ephemeral filesystem (Render, Railway, Fly...). Kept in their own collection so listing
// applications never loads file bytes.
const resumeFileSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true, unique: true },
    fileName: { type: String, required: true, maxlength: 200 },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeFile", resumeFileSchema);
