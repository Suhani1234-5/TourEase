const mongoose = require('mongoose');

// Database model for storing user itineraries
const itinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Allow anonymous itineraries for now
    },

    // Basic trip info
    destination: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    travelers: {
        type: Number,
        default: 1
    },

    budget: {
        type: String,
        enum: ['budget', 'moderate', 'luxury'],
        default: 'moderate'
    },

    // Numeric budget (INR) for Smart Trip Planner
    budgetAmount: {
        type: Number
    },

    // Trip length in days (Smart Planner uses days instead of only date range)
    days: {
        type: Number
    },

    travelType: {
        type: String,
        enum: ['budget', 'luxury', 'adventure', 'family', 'solo', 'beach', 'mountains'],
    },

    // Distinguishes classic vs smart planner records
    plannerType: {
        type: String,
        enum: ['classic', 'smart'],
        default: 'classic'
    },

    // Full structured AI/rule-based plan (JSON)
    generatedPlan: {
        type: mongoose.Schema.Types.Mixed
    },

    estimatedCost: {
        type: mongoose.Schema.Types.Mixed
    },

    isFavorite: {
        type: Boolean,
        default: false
    },

    accommodation: {
        type: String,
        default: 'hotel'
    },

    interests: [{
        type: String
    }],

    // The actual day-by-day plan
    dailySchedule: [{
        day: Number,
        date: Date,
        activities: [mongoose.Schema.Types.Mixed],
        eventEnhanced: {
            type: Boolean,
            default: false
        },
        weatherAlert: {
            type: Boolean,
            default: false
        }
    }],

    // Track which suggestions were applied
    appliedSuggestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suggestion'
    }],

    // If user wants dynamic monitoring enabled
    dynamicMonitoring: {
        type: Boolean,
        default: true
    },

    // Original AI-generated plan (for reference)
    originalPlan: {
        type: String
    }

}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Add some useful methods
itinerarySchema.methods.getDuration = function () {
    const days = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
    return days;
};

itinerarySchema.methods.isActive = function () {
    const now = new Date();
    return this.startDate <= now && now <= this.endDate;
};

itinerarySchema.methods.isUpcoming = function () {
    return this.startDate > new Date();
};

module.exports = mongoose.model('Itinerary', itinerarySchema);
