import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react';

// Weather widget to show forecast for trip days
const WeatherWidget = ({ weather }) => {
    if (!weather || weather.length === 0) {
        return null;
    }

    const getWeatherIcon = (condition) => {
        const cond = condition.toLowerCase();

        if (cond.includes('rain') || cond.includes('drizzle')) {
            return <CloudRain className="w-8 h-8 text-blue-500" />;
        } else if (cond.includes('snow')) {
            return <CloudSnow className="w-8 h-8 text-blue-300" />;
        } else if (cond.includes('cloud')) {
            return <Cloud className="w-8 h-8 text-gray-500" />;
        } else if (cond.includes('clear') || cond.includes('sun')) {
            return <Sun className="w-8 h-8 text-yellow-500" />;
        } else {
            return <Cloud className="w-8 h-8 text-gray-400" />;
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getConditionColor = (condition, precipitation) => {
        if (precipitation > 70 || condition.toLowerCase().includes('storm')) {
            return 'bg-blue-100 border-blue-300';
        } else if (precipitation > 40) {
            return 'bg-gray-100 border-gray-300';
        } else {
            return 'bg-yellow-50 border-yellow-200';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Weather Forecast</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {weather.slice(0, 5).map((day, index) => (
                    <div
                        key={index}
                        className={`border-2 rounded-lg p-3 ${getConditionColor(day.condition, day.precipitation)}`}
                    >
                        {/* Date */}
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                            {formatDate(day.date)}
                        </div>

                        {/* Icon */}
                        <div className="flex justify-center mb-2">
                            {getWeatherIcon(day.condition)}
                        </div>

                        {/* Temperature */}
                        <div className="text-center mb-2">
                            <div className="text-2xl font-bold text-gray-900">
                                {day.temp.max}°
                            </div>
                            <div className="text-xs text-gray-600">
                                {day.temp.min}°
                            </div>
                        </div>

                        {/* Condition */}
                        <div className="text-xs text-center text-gray-700 capitalize mb-2">
                            {day.description || day.condition}
                        </div>

                        {/* Rain probability */}
                        {day.precipitation > 0 && (
                            <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                                <Droplets className="w-3 h-3" />
                                <span>{day.precipitation}%</span>
                            </div>
                        )}

                        {/* Wind */}
                        {day.windSpeed && day.windSpeed > 20 && (
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mt-1">
                                <Wind className="w-3 h-3" />
                                <span>{day.windSpeed} km/h</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Weather alerts */}
            {weather.some(day => day.precipitation > 70 || day.temp.max > 38) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex gap-2 items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                        Some days have extreme weather conditions. Check suggestions for alternative plans.
                    </p>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;
