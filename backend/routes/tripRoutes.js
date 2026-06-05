const express = require("express");
const router = express.Router();

const {
  generateTrip,
  refineTrip,
} = require("../controllers/tripController");

const { verifyToken } = require("../middleware/auth");
const { aiTripLimiter } = require("../middleware/rateLimiter");

// @route   POST /api/trip/generate
// @desc    Generate a weather-aware trip itinerary
// @access  Private (Login required)
router.post("/generate", verifyToken, aiTripLimiter, generateTrip);

// @route   POST /api/trip/refine
// @desc    Refine an existing itinerary
// @access  Private (Login required)
router.post("/refine", verifyToken, aiTripLimiter, refineTrip);

module.exports = router;