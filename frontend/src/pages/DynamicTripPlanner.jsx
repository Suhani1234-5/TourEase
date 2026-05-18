import React, { useState, useEffect } from 'react';
import {
    Bell,
    Sparkles,
    RefreshCw,
    Save,
    Eye
} from 'lucide-react';
import { api } from '../services/api';
import ItineraryDisplay from '../components/ItineraryDisplay';
import SuggestionCard from '../components/SuggestionCard';
import WeatherWidget from '../components/WeatherWidget';
import EventCard from '../components/EventCard';

// Enhanced Trip Planner with dynamic itinerary monitoring
const DynamicTripPlanner = ({ tripData, initialItineraryId, onBack }) => {
    const [itinerary, setItinerary] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [weather, setWeather] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'suggestions', 'events'

    useEffect(() => {
        if (initialItineraryId) {
            loadExistingItinerary(initialItineraryId);
        } else if (tripData) {
            saveItinerary();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialItineraryId]);

    const loadExistingItinerary = async (id) => {
        try {
            setLoading(true);
            const response = await api.getItinerary(id);
            if (response.success) {
                setItinerary(response.itinerary);
                // Auto-analyze for dynamic content
                analyzeDynamicContent(id);
            }
        } catch (error) {
            console.error('Error loading itinerary:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveItinerary = async () => {
        try {
            setLoading(true);

            // Parse the AI-generated plan into structured format (simplified)
            const dailySchedule = parsePlanToDailySchedule(tripData.plan, tripData.startDate, tripData.endDate);

            const itineraryData = {
                destination: tripData.destination,
                startDate: tripData.startDate,
                endDate: tripData.endDate,
                travelers: tripData.travelers,
                budget: tripData.budget,
                accommodation: tripData.accommodation,
                interests: tripData.interests,
                dailySchedule,
                originalPlan: tripData.plan,
                dynamicMonitoring: true
            };

            const response = await api.saveItinerary(itineraryData);

            if (response.success) {
                setItinerary(response.itinerary);
                // Auto-analyze for dynamic content
                analyzeDynamicContent(response.itinerary._id);
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
        } finally {
            setLoading(false);
        }
    };

    const analyzeDynamicContent = async (itineraryId) => {
        try {
            setAnalyzing(true);

            const response = await api.analyzeItinerary(itineraryId);

            if (response.success) {
                setSuggestions(response.analysis.suggestions || []);
                setWeather(response.analysis.weather || []);
                setEvents(response.analysis.events || []);
            }
        } catch (error) {
            console.error('Error analyzing itinerary:', error);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleAcceptSuggestion = async (suggestion) => {
        try {
            await api.applySuggestion(itinerary._id, suggestion._id);

            // Refresh itinerary
            const updated = await api.getItinerary(itinerary._id);
            setItinerary(updated.itinerary);

            // Remove suggestion from list
            setSuggestions(prev => prev.filter(s => s._id !== suggestion._id));

            alert('Suggestion applied successfully!');
        } catch (error) {
            console.error('Error applying suggestion:', error);
            alert('Failed to apply suggestion');
        }
    };

    const handleRejectSuggestion = async (suggestion) => {
        try {
            await api.rejectSuggestion(itinerary._id, suggestion._id);

            // Remove from list
            setSuggestions(prev => prev.filter(s => s._id !== suggestion._id));
        } catch (error) {
            console.error('Error rejecting suggestion:', error);
        }
    };

    // Simple parser to convert AI text to daily schedule
    const parsePlanToDailySchedule = (planText, startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        const schedule = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);

            schedule.push({
                day: i + 1,
                date: date.toISOString(),
                activities: [
                    {
                        time: 'morning',
                        activity: 'Explore local attractions',
                        location: tripData.destination,
                        type: 'sightseeing'
                    },
                    {
                        time: 'afternoon',
                        activity: 'Lunch and leisure',
                        location: tripData.destination,
                        type: 'dining'
                    },
                    {
                        time: 'evening',
                        activity: 'Dinner and relaxation',
                        location: tripData.destination,
                        type: 'dining'
                    }
                ],
                eventEnhanced: false,
                weatherAlert: false
            });
        }

        return schedule;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Setting up your dynamic itinerary...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Your Dynamic Trip Plan</h1>
                            <p className="text-blue-100">
                                Real-time monitoring for events, weather, and travel disruptions
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {analyzing && (
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Analyzing...</span>
                                </div>
                            )}

                            {suggestions.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('suggestions')}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors relative"
                                >
                                    <Bell className="w-5 h-5" />
                                    {suggestions.length} Suggestions
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                                        {suggestions.length}
                                    </span>
                                </button>
                            )}

                            <button
                                onClick={onBack}
                                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('itinerary')}
                            className={`px-6 py-4 font-semibold transition-colors border-b-2 ${activeTab === 'itinerary'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Eye className="w-5 h-5 inline mr-2" />
                            Itinerary
                        </button>

                        <button
                            onClick={() => setActiveTab('suggestions')}
                            className={`px-6 py-4 font-semibold transition-colors border-b-2 relative ${activeTab === 'suggestions'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Sparkles className="w-5 h-5 inline mr-2" />
                            Suggestions
                            {suggestions.length > 0 && (
                                <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                                    {suggestions.length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-6 py-4 font-semibold transition-colors border-b-2 ${activeTab === 'events'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Nearby Events
                            {events.length > 0 && (
                                <span className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                                    {events.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'itinerary' && (
                    <div className="space-y-6">
                        {/* Weather Widget */}
                        {weather.length > 0 && (
                            <WeatherWidget weather={weather} />
                        )}

                        {/* Itinerary Display */}
                        {itinerary && (
                            <ItineraryDisplay itinerary={itinerary} showWeather={true} />
                        )}

                        {/* Original AI Plan */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">Original AI-Generated Plan</h3>
                            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-700 text-sm">
                                {itinerary?.originalPlan || tripData?.plan}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'suggestions' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-900 font-semibold">
                                💡 We've analyzed your itinerary and found {suggestions.length} ways to enhance your trip!
                            </p>
                        </div>

                        {suggestions.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600">No suggestions available yet</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {analyzing ? 'Analyzing your trip...' : 'Check back later for dynamic updates'}
                                </p>
                            </div>
                        ) : (
                            suggestions.map((suggestion) => (
                                <SuggestionCard
                                    key={suggestion._id}
                                    suggestion={suggestion}
                                    onAccept={handleAcceptSuggestion}
                                    onReject={handleRejectSuggestion}
                                />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                            <p className="text-purple-900 font-semibold">
                                🎉 {events.length} events happening during your visit
                            </p>
                        </div>

                        {events.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <p className="text-gray-600">No nearby events found</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map((event) => (
                                    <EventCard
                                        key={event.eventId}
                                        event={event}
                                        onAddToItinerary={null} // Can add functionality later
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicTripPlanner;
