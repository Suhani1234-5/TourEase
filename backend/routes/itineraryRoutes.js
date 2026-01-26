const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const jwt = require("jsonwebtoken");

// --- Middleware to Verify Token ---
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Routes
// We add 'verifyToken' before the controller to protect the route
router.post('/save', verifyToken, itineraryController.saveItinerary);

// These can remain public or be protected depending on your needs
router.post('/analyze', itineraryController.analyzeItinerary);
router.get('/user', verifyToken, itineraryController.getUserItineraries); // Protect this too!
router.get('/:id', itineraryController.getItinerary);
router.get('/:id/suggestions', itineraryController.getSuggestions);
router.patch('/:id/apply', verifyToken, itineraryController.applySuggestion);
router.patch('/:id/reject', verifyToken, itineraryController.rejectSuggestion);

module.exports = router;