const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { addNote, getNotes } = require("../controllers/notesController");

// Add a new note
router.post("/:patientId", auth(["doctor", "nurse", "admin"]), addNote);

// Get notes for a patient
router.get("/:patientId", auth(["doctor", "nurse", "admin"]), getNotes);

module.exports = router;
