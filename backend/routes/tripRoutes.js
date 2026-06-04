const express = require("express");
const router = express.Router();

const {
  generateTrip,
  refineTrip,
} = require("../controllers/tripController");
const { aiTripLimiter } = require("../middleware/rateLimiter");

router.post("/generate", aiTripLimiter, generateTrip);
router.post("/refine", aiTripLimiter, refineTrip);

module.exports = router;