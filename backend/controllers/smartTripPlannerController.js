/**
 * Smart Trip Planner API — generate, list, update, delete saved itineraries.
 */
const Itinerary = require('../models/Itinerary');
const {
  generateSmartItinerary,
  buildDateRange,
  planToDailySchedule,
} = require('../services/smartTripPlannerService');

/** POST /api/smart-planner/generate-itinerary */
exports.generateItinerary = async (req, res) => {
  try {
    const generatedPlan = await generateSmartItinerary(req.body);
    const days = Number(req.body.days) || 1;
    const { startDate, endDate } = buildDateRange(days);

    res.json({
      success: true,
      generatedPlan,
      meta: {
        destination: req.body.destination,
        startDate,
        endDate,
        days,
        travelers: Number(req.body.travelers) || 1,
        travelType: req.body.travelType,
        budget: Number(req.body.budget),
        interests: req.body.interests || [],
      },
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Failed to generate itinerary',
    });
  }
};

/** POST /api/smart-planner/save — persist after generation (auth required) */
exports.saveGeneratedItinerary = async (req, res) => {
  try {
    const {
      destination,
      budget,
      days,
      travelType,
      interests,
      travelers,
      generatedPlan,
    } = req.body;

    if (!destination || !generatedPlan) {
      return res.status(400).json({
        success: false,
        message: 'destination and generatedPlan are required',
      });
    }

    const dayCount = Number(days) || generatedPlan.dailyItinerary?.length || 1;
    const { startDate, endDate } = buildDateRange(dayCount);
    const dailySchedule = planToDailySchedule(generatedPlan, startDate);

    const budgetTier =
      Number(budget) < 30000 ? 'budget' : Number(budget) > 100000 ? 'luxury' : 'moderate';

    const itinerary = new Itinerary({
      userId: req.user.id,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers: Number(travelers) || 1,
      budget: budgetTier,
      budgetAmount: Number(budget),
      days: dayCount,
      travelType,
      interests: interests || [],
      generatedPlan,
      estimatedCost: generatedPlan.estimatedCost,
      dailySchedule,
      originalPlan: JSON.stringify(generatedPlan),
      plannerType: 'smart',
    });

    await itinerary.save();

    res.status(201).json({
      success: true,
      message: 'Itinerary saved successfully',
      itinerary,
    });
  } catch (error) {
    console.error('Save smart itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save itinerary',
      error: error.message,
    });
  }
};

/** GET /api/smart-planner/saved-itineraries */
exports.getSavedItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      userId: req.user.id,
      plannerType: 'smart',
    })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: itineraries.length,
      itineraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch itineraries',
    });
  }
};

/** GET /api/smart-planner/saved-itineraries/:id */
exports.getSavedItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id,
      plannerType: 'smart',
    });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    res.json({ success: true, itinerary });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch itinerary' });
  }
};

/** PATCH /api/smart-planner/saved-itineraries/:id */
exports.updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id,
      plannerType: 'smart',
    });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    const allowed = [
      'destination',
      'budgetAmount',
      'days',
      'travelType',
      'interests',
      'travelers',
      'generatedPlan',
      'estimatedCost',
      'isFavorite',
    ];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        itinerary[key] = req.body[key];
      }
    });

    if (req.body.generatedPlan) {
      itinerary.dailySchedule = planToDailySchedule(
        req.body.generatedPlan,
        itinerary.startDate
      );
      itinerary.originalPlan = JSON.stringify(req.body.generatedPlan);
    }

    if (req.body.days) {
      const { startDate, endDate } = buildDateRange(Number(req.body.days));
      itinerary.startDate = new Date(startDate);
      itinerary.endDate = new Date(endDate);
      itinerary.days = Number(req.body.days);
    }

    await itinerary.save();

    res.json({
      success: true,
      message: 'Itinerary updated',
      itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update itinerary',
      error: error.message,
    });
  }
};

/** DELETE /api/smart-planner/saved-itineraries/:id */
exports.deleteItinerary = async (req, res) => {
  try {
    const result = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      plannerType: 'smart',
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    res.json({ success: true, message: 'Itinerary deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete itinerary' });
  }
};

/** PATCH /api/smart-planner/saved-itineraries/:id/favorite */
exports.toggleFavorite = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id,
      plannerType: 'smart',
    });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    itinerary.isFavorite = !itinerary.isFavorite;
    await itinerary.save();

    res.json({
      success: true,
      isFavorite: itinerary.isFavorite,
      itinerary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update favorite' });
  }
};
