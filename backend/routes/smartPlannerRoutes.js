const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const smartTripPlannerController = require('../controllers/smartTripPlannerController');

// Public: generate itinerary (no auth — preview before login)
router.post('/generate-itinerary', smartTripPlannerController.generateItinerary);

// Protected: CRUD for saved smart itineraries
router.post('/save', verifyToken, smartTripPlannerController.saveGeneratedItinerary);
router.get('/saved-itineraries', verifyToken, smartTripPlannerController.getSavedItineraries);
router.get('/saved-itineraries/:id', verifyToken, smartTripPlannerController.getSavedItineraryById);
router.patch('/saved-itineraries/:id', verifyToken, smartTripPlannerController.updateItinerary);
router.delete('/saved-itineraries/:id', verifyToken, smartTripPlannerController.deleteItinerary);
router.patch('/saved-itineraries/:id/favorite', verifyToken, smartTripPlannerController.toggleFavorite);

module.exports = router;
