const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },        // e.g., "Updated Vitals", "Assigned Doctor"
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
