// Controller for event discovery endpoints
const eventService = require('../services/eventService');
const EventCache = require('../models/EventCache');

// Get events near a location
exports.getNearbyEvents = async (req, res) => {
    try {
        const { location, startDate, endDate, radius } = req.query;

        if (!location || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: location, startDate, endDate'
            });
        }

        // Check cache first
        const cached = await EventCache.findCached(location, startDate, endDate);

        if (cached) {
            console.log('Returning cached events');
            return res.json({
                success: true,
                source: 'cache',
                count: cached.events.length,
                events: cached.events
            });
        }

        // Fetch fresh data
        const events = await eventService.fetchNearbyEvents(
            location,
            startDate,
            endDate,
            radius ? parseInt(radius, 10) : 25
        );

        // Cache the results
        const eventCache = new EventCache({
            location,
            searchRadius: radius || 25,
            dateRange: {
                start: new Date(startDate),
                end: new Date(endDate)
            },
            events
        });

        await eventCache.save();

        res.json({
            success: true,
            source: 'api',
            count: events.length,
            events
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
            error: error.message
        });
    }
};

// Get events by category
exports.getEventsByCategory = async (req, res) => {
    try {
        const { type } = req.params;
        const { location, startDate, endDate } = req.query;

        if (!location || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters'
            });
        }

        const events = await eventService.getEventsByType(
            location,
            type,
            startDate,
            endDate
        );

        res.json({
            success: true,
            category: type,
            count: events.length,
            events
        });

    } catch (error) {
        console.error('Error fetching events by category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
            error: error.message
        });
    }
};

// Get event details (placeholder for now)
exports.getEventDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // For now, search in cache
        const caches = await EventCache.find({});

        let eventDetails = null;
        for (const cache of caches) {
            const found = cache.events.find(e => e.eventId === id);
            if (found) {
                eventDetails = found;
                break;
            }
        }

        if (!eventDetails) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.json({
            success: true,
            event: eventDetails
        });

    } catch (error) {
        console.error('Error fetching event details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch event details',
            error: error.message
        });
    }
};
