const express = require("express");
const router = express.Router();

const {
  generateTrip,
  refineTrip,
} = require("../controllers/tripController");

// @route   POST /api/trip/generate
// @desc    Generate a weather-aware trip itinerary
// @access  Public (No login required)
router.post("/generate", generateTrip);

// @route   POST /api/trip/refine
// @desc    Refine an existing itinerary
// @access  Public (No login required)
router.post("/refine", refineTrip);

module.exports = router;