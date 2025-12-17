const Log = require("../models/LOG.JS");

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("performedBy", "name role")
      .populate("patient", "name room")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
