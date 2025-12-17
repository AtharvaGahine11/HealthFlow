const User = require("../models/User");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------
// ADD NEW STAFF (Admin Only)
// ---------------------------------------------------
exports.addStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent duplicate emails
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    // Remove password from response
    const cleanUser = user.toObject();
    delete cleanUser.password;

    res.json(cleanUser);
  } catch (err) {
    console.error("Add Staff Error:", err);
    res.status(500).json({ message: "Error adding staff" });
  }
};

// ---------------------------------------------------
// GET ALL STAFF (Doctors + Nurses)
// Includes Assigned Patient Count
// ---------------------------------------------------
exports.getStaff = async (req, res) => {
  try {
    // Fetch all staff except admins
    const staff = await User.find({ role: { $ne: "admin" } })
      .select("name email role");

    // Add assigned patient counts for each doctor
    const staffWithCounts = await Promise.all(
      staff.map(async (member) => {
        const count = await Patient.countDocuments({
          assignedDoctor: member._id,
        });

        return {
          ...member.toObject(),
          assignedPatientsCount: count,
        };
      })
    );

    res.json(staffWithCounts);
  } catch (err) {
    console.error("Get Staff Error:", err);
    res.status(500).json({ message: "Error fetching staff list" });
  }
};

// ---------------------------------------------------
// UPDATE STAFF
// ---------------------------------------------------
exports.updateStaff = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password is being updated → hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const staff = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!staff) return res.status(404).json({ message: "Staff not found" });

    res.json(staff);
  } catch (err) {
    console.error("Update Staff Error:", err);
    res.status(500).json({ message: "Error updating staff" });
  }
};

// ---------------------------------------------------
// DELETE STAFF
// ---------------------------------------------------
exports.deleteStaff = async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);

    if (!removed)
      return res.status(404).json({ message: "Staff member not found" });

    res.json({ message: "Staff removed successfully" });
  } catch (err) {
    console.error("Delete Staff Error:", err);
    res.status(500).json({ message: "Error deleting staff" });
  }
};
