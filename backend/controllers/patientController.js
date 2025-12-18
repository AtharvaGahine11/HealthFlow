const Patient = require("../models/Patient");
const Log = require("../models/LOG.JS"); // Case-sensitive

// -------------------------------------------------------
// Add Patient
// -------------------------------------------------------
exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    await Log.create({
      action: "Patient Added",
      performedBy: req.user.id,
      patient: patient._id,
      details: `New patient added: ${patient.name}`,
    });

    res.json(patient);
  } catch (err) {
    console.error("Add Patient Error:", err);
    res.status(500).json({ message: "Error adding patient" });
  }
};

// -------------------------------------------------------
// Get All Patients
// -------------------------------------------------------
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("assignedDoctor", "name email");

    res.json(patients);
  } catch (err) {
    console.error("Get Patients Error:", err);
    res.status(500).json({ message: "Error fetching patients" });
  }
};

// -------------------------------------------------------
// Get Patient By ID
// -------------------------------------------------------
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("assignedDoctor", "name email")
      .populate("vitalsHistory");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error("Get Patient Error:", err);
    res.status(500).json({ message: "Error fetching patient" });
  }
};

// -------------------------------------------------------
// Update Patient (Vitals Update + Any Data)
// -------------------------------------------------------
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // If vitals are being updated -> save previous to HISTORY
    if (req.body.vitals) {
      const historyEntry = {
        bp: req.body.vitals.bp,
        temperature: req.body.vitals.temperature,
        spo2: req.body.vitals.spo2,
        pulse: req.body.vitals.pulse,
        recordedAt: new Date()
      };

      patient.vitalsHistory.push(historyEntry);

      // Update current vitals
      patient.vitals = req.body.vitals;
    }

    // Apply remaining updates
    Object.assign(patient, req.body);

    const updatedPatient = await patient.save();

    await Log.create({
      action: "Updated Patient",
      performedBy: req.user.id,
      patient: updatedPatient._id,
      details: "Patient details updated",
    });

    res.json(updatedPatient);
  } catch (err) {
    console.error("Update Patient Error:", err);
    res.status(500).json({ message: "Error updating patient" });
  }
};

// -------------------------------------------------------
// Assign Doctor to Patient
// -------------------------------------------------------
exports.assignDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { assignedDoctor: doctorId },
      { new: true }
    ).populate("assignedDoctor", "name");

    if (!updated) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Log.create({
      action: "Assigned Doctor",
      performedBy: req.user.id,
      patient: req.params.id,
      details: `Assigned doctor: ${updated.assignedDoctor.name}`,
    });

    res.json(updated);
  } catch (err) {
    console.error("Assign Doctor Error:", err);
    res.status(500).json({ message: "Error assigning doctor" });
  }
};

// -------------------------------------------------------
// Get Patients Assigned to a Doctor (Doctor Dashboard)
// -------------------------------------------------------
exports.getAssignedPatients = async (req, res) => {
  try {
    const patients = await Patient.find({
      assignedDoctor: req.user.id,
    });

    res.json(patients);
  } catch (err) {
    console.error("Assigned Patients Error:", err);
    res.status(500).json({ message: "Error fetching assigned patients" });
  }
};

// -------------------------------------------------------
// Delete Patient
// -------------------------------------------------------
exports.deletePatient = async (req, res) => {
  try {
    const removed = await Patient.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Log.create({
      action: "Patient Deleted",
      performedBy: req.user.id,
      patient: req.params.id,
      details: `Patient deleted`,
    });

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("Delete Patient Error:", err);
    res.status(500).json({ message: "Error deleting patient" });
  }
};
