const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ patient: req.params.patientId })
      .populate("author", "name role")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

exports.addNote = async (req, res) => {
  try {
    const note = await Note.create({
      patient: req.params.patientId,
      author: req.user.id,
      text: req.body.text,
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};
