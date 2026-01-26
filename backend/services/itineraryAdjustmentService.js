// Itinerary adjustment engine - the brain of the dynamic system
// Combines event, weather, and disruption data to make smart suggestions

const eventService = require('./eventService');
const weatherService = require('./weatherService');
const disruptionService = require('./disruptionService');
const OpenAI = require('openai');

class ItineraryAdjustmentService {
    constructor() {
        // CHANGED: Use OpenRouter configuration to match your .env file
        this.openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: "https://openrouter.ai/api/v1"
        });
    }

    // Main analysis function - looks at an itinerary and finds improvement opportunities
    async analyzeItinerary(itinerary) {
        try {
            const { destination, startDate, endDate, interests, dailySchedule } = itinerary;

            // Fetch all the data we need
            const [events, weather, disruptions] = await Promise.all([
                eventService.fetchNearbyEvents(destination, startDate, endDate),
                weatherService.getWeatherForecast(destination, { start: startDate, end: endDate }),
                disruptionService.getCurrentDisruptions(destination, startDate, endDate)
            ]);

            // Check for weather issues
            const weatherDisruptions = weatherService.detectWeatherDisruptions(weather);

            // Generate suggestions for each type
            const suggestions = [];

            // Event-based suggestions
            const eventSuggestions = this._generateEventSuggestions(
                dailySchedule,
                events,
                interests
            );
            suggestions.push(...eventSuggestions);

            // Weather-based suggestions
            const weatherSuggestions = this._generateWeatherSuggestions(
                dailySchedule,
                weather,
                weatherDisruptions
            );
            suggestions.push(...weatherSuggestions);

            // Disruption-based suggestions
            const disruptionSuggestions = this._generateDisruptionSuggestions(
                dailySchedule,
                disruptions
            );
            suggestions.push(...disruptionSuggestions);

            // Score and rank all suggestions
            const rankedSuggestions = this._scoreAndRankSuggestions(suggestions, interests);

            return {
                suggestions: rankedSuggestions,
                summary: {
                    totalSuggestions: rankedSuggestions.length,
                    highPriority: rankedSuggestions.filter(s => s.priority === 'high').length,
                    eventsFound: events.length,
                    weatherAlerts: weatherDisruptions.length,
                    disruptions: disruptions.length
                },
                events,
                weather,
                disruptions
            };

        } catch (error) {
            console.error('Error analyzing itinerary:', error);
            throw error;
        }
    }

    // Generate suggestions based on nearby events
    _generateEventSuggestions(dailySchedule, events, interests) {
        const suggestions = [];

        events.forEach(event => {
            const eventDate = new Date(event.date).toISOString().split('T')[0];

            // Find which day of the itinerary this event falls on
            const matchingDay = dailySchedule?.find(day => {
                const dayDate = new Date(day.date).toISOString().split('T')[0];
                return dayDate === eventDate;
            });

            if (matchingDay) {
                // Calculate relevance score
                const relevance = eventService.calculateRelevanceScore(event, interests);

                // Only suggest if highly relevant
                if (relevance > 60) {
                    suggestions.push({
                        type: 'event',
                        priority: relevance > 80 ? 'high' : 'medium',
                        day: matchingDay.day,
                        title: `Add ${event.name} to your plans`,
                        description: event.description,
                        changes: {
                            suggested: {
                                time: this._suggestEventTime(event, matchingDay),
                                activity: event.name,
                                location: event.location.name,
                                type: 'event'
                            },
                            reasoning: `This ${event.category} event matches your interests and is happening during your visit!`
                        },
                        eventDetails: event,
                        score: relevance
                    });
                }
            }
        });

        return suggestions;
    }

    // Generate weather-based suggestions
    _generateWeatherSuggestions(dailySchedule, weather, weatherDisruptions) {
        const suggestions = [];

        weatherDisruptions.forEach(disruption => {
            const matchingDay = dailySchedule?.find(day => {
                const dayDate = new Date(day.date).toISOString().split('T')[0];
                return dayDate === disruption.date;
            });

            if (matchingDay && matchingDay.activities) {
                // Check if this day has outdoor activities planned
                const hasOutdoorActivities = matchingDay.activities.some(act =>
                    this._isOutdoorActivity(act)
                );

                if (hasOutdoorActivities) {
                    const dayWeather = weather.find(w => w.date === disruption.date);
                    const alternatives = weatherService.suggestIndoorAlternatives(dayWeather);

                    disruption.issues.forEach(issue => {
                        suggestions.push({
                            type: 'weather',
                            priority: issue.severity === 'high' ? 'high' : 'medium',
                            day: matchingDay.day,
                            title: `Weather Alert: ${issue.message}`,
                            description: `Consider adjusting your outdoor activities`,
                            changes: {
                                original: matchingDay.activities,
                                suggested: alternatives,
                                reasoning: `Weather forecast shows ${dayWeather.condition.toLowerCase()} with ${dayWeather.precipitation}% chance of rain`
                            },
                            weatherContext: dayWeather,
                            score: issue.severity === 'high' ? 85 : 65
                        });
                    });
                }
            }
        });

        return suggestions;
    }

    // Generate disruption-based suggestions
    _generateDisruptionSuggestions(dailySchedule, disruptions) {
        const suggestions = [];

        disruptions.forEach(disruption => {
            const severity = disruptionService.categorizeSeverity(disruption);

            disruption.affectedDates.forEach(affectedDate => {
                const dateStr = new Date(affectedDate).toISOString().split('T')[0];
                const matchingDay = dailySchedule?.find(day => {
                    const dayDate = new Date(day.date).toISOString().split('T')[0];
                    return dayDate === dateStr;
                });

                if (matchingDay) {
                    suggestions.push({
                        type: 'disruption',
                        priority: severity.priority === 1 ? 'high' : 'medium',
                        day: matchingDay.day,
                        title: disruption.title,
                        description: disruption.description,
                        changes: {
                            reasoning: disruption.mitigation
                        },
                        score: severity.priority === 1 ? 90 : 70
                    });
                }
            });
        });

        return suggestions;
    }

    // Score and rank suggestions by importance
    _scoreAndRankSuggestions(suggestions, interests = []) {
        // Sort by score (higher is better)
        return suggestions.sort((a, b) => b.score - a.score);
    }

    // Suggest best time to add an event to the day
    _suggestEventTime(event, day) {
        const eventHour = new Date(event.date).getHours();

        if (eventHour < 12) return 'morning';
        if (eventHour < 17) return 'afternoon';
        return 'evening';
    }

    // Determine if an activity is outdoor
    _isOutdoorActivity(activity) {
        const outdoorKeywords = [
            'park', 'beach', 'hiking', 'walk', 'outdoor', 'garden',
            'mountain', 'nature', 'trek', 'tour', 'sightseeing'
        ];

        const activityText = (activity.activity || activity.name || '').toLowerCase();
        return outdoorKeywords.some(keyword => activityText.includes(keyword));
    }

    // Use AI to generate a reshuffled itinerary if needed
    async reshuffleItinerary(itinerary, constraints) {
        try {
            const prompt = `
You are a travel planner. The user has an itinerary that needs adjustment due to ${constraints.reason}.

Original itinerary:
${JSON.stringify(itinerary.dailySchedule, null, 2)}

Constraints:
- ${constraints.details}

Please suggest a reshuffled itinerary that accommodates these constraints while keeping the trip enjoyable.
Return a brief explanation of changes made.
`;

            const response = await this.openai.chat.completions.create({
                model: 'meta-llama/llama-3.1-8b-instruct', // CHANGED: Compatible model for OpenRouter
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500
            });

            return response.choices[0].message.content;

        } catch (error) {
            console.error('Error reshuffling itinerary:', error);
            return 'Unable to generate alternative itinerary at this time.';
        }
    }
}

module.exports = new ItineraryAdjustmentService();