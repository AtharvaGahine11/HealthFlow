const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff
} = require("../controllers/staffController");

router.post("/", auth(["admin"]), addStaff);
router.get("/", auth(["admin", "doctor"]), getStaff);
router.put("/:id", auth(["admin"]), updateStaff);
router.delete("/:id", auth(["admin"]), deleteStaff);

module.exports = router;
