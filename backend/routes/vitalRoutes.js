const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { updateVitals } = require("../controllers/vitalsController");

router.put("/:id", auth(["nurse", "doctor"]), updateVitals);

module.exports = router;
