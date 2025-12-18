const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getAssignedPatients,
  assignDoctor
} = require("../controllers/patientController");

// Add new patient
router.post("/", auth(["admin", "doctor"]), addPatient);

// Get all patients
router.get("/", auth(["admin", "doctor", "nurse"]), getPatients);

// Doctor-only: Get assigned patients
router.get("/assigned/list", auth(["doctor"]), getAssignedPatients);

// Assign doctor (IMPORTANT FIX)
router.put("/:id/assign-doctor", auth(["admin", "doctor"]), assignDoctor);

// Get patient by ID
router.get("/:id", auth(["admin", "doctor", "nurse"]), getPatientById);

// Update patient
router.put("/:id", auth(["admin", "doctor", "nurse"]), updatePatient);


// Delete patient
router.delete("/:id", auth(["admin"]), deletePatient);

module.exports = router;
