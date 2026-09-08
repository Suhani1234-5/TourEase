import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react';

// Weather widget to show forecast for trip days
const WeatherWidget = ({ weather }) => {
  if (!weather || weather.length === 0) {
    return null;
  }

  const getWeatherIcon = (day) => {
    const condition = day.condition || '';
    const cond = condition.toLowerCase();
    const label = `${condition || 'Weather'} condition icon`;

    // Handle image-based weather condition icons
    if (day.iconUrl || day.icon) {
      return (
        <img
          src={day.iconUrl || day.icon}
          alt={condition ? `${condition} weather icon` : 'Weather condition icon'}
          className="w-10 h-10 object-contain"
        />
      );
    }

    // Handle SVG weather condition icons with accessible role & aria-label
    if (cond.includes('rain') || cond.includes('drizzle')) {
      return <CloudRain className="w-8 h-8 text-blue-500" role="img" aria-label={label} />;
    } else if (cond.includes('snow')) {
      return <CloudSnow className="w-8 h-8 text-blue-300" role="img" aria-label={label} />;
    } else if (cond.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-gray-500 dark:text-gray-400" role="img" aria-label={label} />;
    } else if (cond.includes('clear') || cond.includes('sun')) {
      return <Sun className="w-8 h-8 text-yellow-500" role="img" aria-label={label} />;
    } else {
      return <Cloud className="w-8 h-8 text-gray-400" role="img" aria-label={label} />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getConditionColor = (condition = '', precipitation = 0) => {
    if (precipitation > 70 || condition.toLowerCase().includes('storm')) {
      return 'bg-blue-100 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800';
    } else if (precipitation > 40) {
      return 'bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-700';
    } else {
      return 'bg-yellow-50 dark:bg-amber-950/20 border-yellow-200 dark:border-amber-800/50';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 border border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-slate-100">Weather Forecast</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {weather.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-3 ${getConditionColor(day.condition, day.precipitation)}`}
          >
            {/* Date */}
            <div className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              {formatDate(day.date)}
            </div>

            {/* Weather Icon */}
            <div className="flex justify-center mb-2">
              {getWeatherIcon(day)}
            </div>

            {/* Temperature */}
            <div className="text-center mb-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Number(day.temp?.max ?? day.temp ?? 0).toFixed(1)}°
              </div>
              {day.temp?.min !== undefined && (
                <div className="text-xs text-gray-600 dark:text-slate-400">
                  {Number(day.temp.min).toFixed(1)}°
                </div>
              )}
            </div>

            {/* Condition Description */}
            <div className="text-xs text-center text-gray-700 dark:text-slate-300 capitalize mb-2 font-medium">
              {day.description || day.condition}
            </div>

            {/* Rain probability */}
            {day.precipitation > 0 && (
              <div className="flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Droplets className="w-3 h-3" aria-hidden="true" />
                <span>{Number(day.precipitation).toFixed(1)}%</span>
              </div>
            )}

            {/* Wind speed */}
            {day.windSpeed && day.windSpeed > 20 && (
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-slate-400 mt-1">
                <Wind className="w-3 h-3" aria-hidden="true" />
                <span>{Number(day.windSpeed).toFixed(1)} km/h</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Weather alerts */}
      {weather.some(day => day.precipitation > 70 || (day.temp?.max || day.temp) > 38) && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-amber-950/30 border border-yellow-300 dark:border-amber-800 rounded-lg flex gap-2 items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-yellow-800 dark:text-amber-200">
            Some days have extreme weather conditions. Check suggestions for alternative plans.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;