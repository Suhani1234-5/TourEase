const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { verifyToken } = require('../middleware/auth');

// Routes
router.post('/save', verifyToken, itineraryController.saveItinerary);

// These can remain public or be protected depending on your needs
router.post('/analyze', itineraryController.analyzeItinerary);
router.get('/user', verifyToken, itineraryController.getUserItineraries); // Protect this too!
router.get('/:id', itineraryController.getItinerary);
router.get('/:id/suggestions', itineraryController.getSuggestions);
router.patch('/:id/apply', verifyToken, itineraryController.applySuggestion);
router.patch('/:id/reject', verifyToken, itineraryController.rejectSuggestion);
router.delete('/:id', verifyToken, itineraryController.deleteItinerary);

module.exports = router;