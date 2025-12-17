const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
