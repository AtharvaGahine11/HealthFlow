const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room: { type: String, required: true },

  triageStatus: {
    type: String,
    enum: ["Critical", "Stable", "Observation"],
    default: "Stable",
  },

  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  checkInTime: {
    type: Date,
    default: Date.now,
  },

  // -----------------------------
  // CURRENT VITALS
  // -----------------------------
  vitals: {
    bp: { type: String, default: "--" },
    temperature: { type: Number, default: null },
    spo2: { type: Number, default: null },
    pulse: { type: Number, default: null }
  },

  // -----------------------------
  // VITALS HISTORY (for charts)
  // -----------------------------
  vitalsHistory: [
    {
      bp: String,
      temperature: Number,
      spo2: Number,
      pulse: Number,
      time: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Patient", PatientSchema);
