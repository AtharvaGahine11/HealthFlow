const Patient = require("../models/Patient");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const activePatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalNurses = await User.countDocuments({ role: "nurse" });

    res.json({
      activePatients,
      totalDoctors,
      totalNurses
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
