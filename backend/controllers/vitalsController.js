const Patient = require("../models/Patient");
const Log = require("../models/LOG.JS");

exports.updateVitals = async (req, res) => {
  try {
    const { bp, pulse, temperature, spo2 } = req.body;

    const patient = await Patient.findById(req.params.id);

    if (!patient)
      return res.status(404).json({ message: "Patient not found" });

    patient.vitals = { bp, pulse, temperature, spo2 };

    patient.vitalsHistory.push({
      bp,
      pulse,
      temperature,
      spo2,
      time: new Date(),
    });

    await patient.save();

    await Log.create({
      action: "Vitals Updated",
      performedBy: req.user.id,
      patient: patient._id,
      details: `BP:${bp}, Pulse:${pulse}, Temp:${temperature}, SpO2:${spo2}`,
    });

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Error updating vitals" });
  }
};
