import React from 'react';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';

// Component to display the full itinerary with day-by-day breakdown
const ItineraryDisplay = ({ itinerary }) => {
    if (!itinerary || !itinerary.dailySchedule) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No itinerary data available</p>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-2xl font-bold">{itinerary.destination}</h2>
                </div>
                <div className="flex items-center gap-4 text-sm opacity-90">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                        {itinerary.travelers} {itinerary.travelers === 1 ? 'traveler' : 'travelers'}
                    </div>
                </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-4">
                {itinerary.dailySchedule.map((day, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg overflow-hidden ${day.eventEnhanced ? 'border-purple-400 shadow-lg' : 'border-gray-200'
                            }`}
                    >
                        {/* Day Header */}
                        <div className={`p-4 ${day.eventEnhanced
                            ? 'bg-linear-to-r from-purple-50 to-pink-50'
                            : 'bg-gray-50'
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                        {day.day}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Day {day.day}</h3>
                                        <p className="text-sm text-gray-600">{formatDate(day.date)}</p>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex gap-2">
                                    {day.eventEnhanced && (
                                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                            <Sparkles className="w-4 h-4" />
                                            Special Event
                                        </span>
                                    )}
                                    {day.weatherAlert && (
                                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                            <CloudRain className="w-4 h-4" />
                                            Weather Alert
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Activities */}
                        <div className="p-4 space-y-3">
                            {day.activities && day.activities.length > 0 ? (
                                day.activities.map((activity, actIndex) => (
                                    <div
                                        key={actIndex}
                                        className="flex gap-4 p-3 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        {/* Time indicator */}
                                        <div className="shrink-0">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span className="capitalize">{activity.time}</span>
                                            </div>
                                        </div>

                                        {/* Activity details */}
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{activity.activity}</h4>
                                            {activity.location && (
                                                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {activity.location}
                                                </p>
                                            )}
                                            {activity.notes && (
                                                <p className="text-sm text-gray-500 mt-2 italic">{activity.notes}</p>
                                            )}
                                            {activity.type === 'event' && (
                                                <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                                    Event
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No activities planned for this day</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItineraryDisplay;
