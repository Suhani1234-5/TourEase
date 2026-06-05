// Controller for managing itineraries and their dynamic adjustments
const Itinerary = require('../models/Itinerary');
const Suggestion = require('../models/Suggestion');
const itineraryAdjustmentService = require('../services/itineraryAdjustmentService');

// Save a new itinerary
exports.saveItinerary = async (req, res) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            travelers,
            budget,
            accommodation,
            interests,
            dailySchedule,
            originalPlan,
            dynamicMonitoring
        } = req.body;

        // Basic validation
        if (!destination || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: destination, startDate, endDate'
            });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Create new itinerary
        const itinerary = new Itinerary({
            userId: req.user.id,
            destination,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            travelers,
            budget,
            accommodation,
            interests: interests || [],
            dailySchedule: dailySchedule || [],
            originalPlan,
            dynamicMonitoring: dynamicMonitoring !== false // Default to true
        });

        await itinerary.save();

        res.json({
            success: true,
            message: 'Itinerary saved successfully',
            itinerary
        });

    } catch (error) {
        console.error('Error saving itinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save itinerary',
            error: error.message
        });
    }
};

// Analyze an itinerary for dynamic adjustments
exports.analyzeItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.body;

        if (!itineraryId) {
            return res.status(400).json({
                success: false,
                message: 'itineraryId is required'
            });
        }

        // Fetch the itinerary
        const itinerary = await Itinerary.findById(itineraryId);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        // Run the analysis
        const analysis = await itineraryAdjustmentService.analyzeItinerary(itinerary);

        // Save suggestions to database
        const savedSuggestions = [];
        for (const suggestion of analysis.suggestions) {
            const newSuggestion = new Suggestion({
                itineraryId: itinerary._id,
                day: suggestion.day,
                suggestionType: suggestion.type,
                priority: suggestion.priority,
                title: suggestion.title,
                description: suggestion.description,
                changes: suggestion.changes,
                eventDetails: suggestion.eventDetails,
                weatherContext: suggestion.weatherContext,
                score: suggestion.score,
                expiresAt: itinerary.endDate
            });

            await newSuggestion.save();
            savedSuggestions.push(newSuggestion);
        }

        res.json({
            success: true,
            analysis: {
                ...analysis,
                suggestions: savedSuggestions
            }
        });

    } catch (error) {
        console.error('Error analyzing itinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze itinerary',
            error: error.message
        });
    }
};

// Get all suggestions for an itinerary
exports.getSuggestions = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.query; // Optional filter by status

        const query = { itineraryId: id };
        if (status) {
            query.status = status;
        }

        const suggestions = await Suggestion.find(query)
            .sort({ priority: 1, score: -1 }); // High priority first, then by score

        res.json({
            success: true,
            count: suggestions.length,
            suggestions
        });

    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch suggestions',
            error: error.message
        });
    }
};

// Apply a suggestion to the itinerary
exports.applySuggestion = async (req, res) => {
    try {
        const { id } = req.params; // itinerary id
        const { suggestionId, modifiedPlan } = req.body;

        const itinerary = await Itinerary.findById(id);
        const suggestion = await Suggestion.findById(suggestionId);

        if (!itinerary || !suggestion) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary or suggestion not found'
            });
        }

        // Ownership check
        if (itinerary.userId && itinerary.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: You do not own this itinerary'
            });
        }

        // Update the itinerary with the suggestion
        if (suggestion.suggestionType === 'event' && suggestion.eventDetails) {
            // Add event to the appropriate day
            const dayIndex = itinerary.dailySchedule.findIndex(d => d.day === suggestion.day);

            if (dayIndex !== -1) {
                itinerary.dailySchedule[dayIndex].activities.push({
                    time: suggestion.changes.suggested.time,
                    activity: suggestion.changes.suggested.activity,
                    location: suggestion.changes.suggested.location,
                    type: 'event',
                    notes: `Added from suggestion: ${suggestion.title}`
                });

                // Mark as event-enhanced
                itinerary.dailySchedule[dayIndex].eventEnhanced = true;
            }
        }

        // Track that this suggestion was applied
        itinerary.appliedSuggestions.push(suggestion._id);
        await itinerary.save();

        // Update suggestion status
        await suggestion.accept(modifiedPlan);

        res.json({
            success: true,
            message: 'Suggestion applied successfully',
            itinerary
        });

    } catch (error) {
        console.error('Error applying suggestion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to apply suggestion',
            error: error.message
        });
    }
};

// Reject a suggestion
exports.rejectSuggestion = async (req, res) => {
    try {
        const { id } = req.params; // itinerary id
        const { suggestionId, feedback } = req.body;

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        // Ownership check
        if (itinerary.userId && itinerary.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: You do not own this itinerary'
            });
        }

        const suggestion = await Suggestion.findById(suggestionId);

        if (!suggestion) {
            return res.status(404).json({
                success: false,
                message: 'Suggestion not found'
            });
        }

        await suggestion.reject(feedback);

        res.json({
            success: true,
            message: 'Suggestion rejected',
            suggestion
        });

    } catch (error) {
        console.error('Error rejecting suggestion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject suggestion',
            error: error.message
        });
    }
};

// Get all itineraries for a user
exports.getUserItineraries = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        const userId = req.user.id;

        const itineraries = await Itinerary.find({ userId })
            .sort({ startDate: -1 });

        res.json({
            success: true,
            count: itineraries.length,
            itineraries
        });

    } catch (error) {
        console.error('Error fetching itineraries:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch itineraries',
            error: error.message
        });
    }
};

// Get single itinerary by ID
exports.getItinerary = async (req, res) => {
    try {
        const { id } = req.params;

        const itinerary = await Itinerary.findById(id)
            .populate('appliedSuggestions');

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        res.json({
            success: true,
            itinerary
        });

    } catch (error) {
        console.error('Error fetching itinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch itinerary',
            error: error.message
        });
    }
};

// Delete an itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        const { id } = req.params;

        const itinerary = await Itinerary.findById(id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        // Ownership check
        if (itinerary.userId && itinerary.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: You do not own this itinerary'
            });
        }

        await Itinerary.findByIdAndDelete(id);

        // Clean up associated suggestions
        const Suggestion = require('../models/Suggestion');
        await Suggestion.deleteMany({ itineraryId: id });

        res.json({
            success: true,
            message: 'Itinerary and associated suggestions deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting itinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete itinerary',
            error: error.message
        });
    }
};
