import React from 'react';
import {
  MapPin,
  Hotel,
  Utensils,
  Bus,
  Star,
  Sun,
  Cloud,
  IndianRupee,
  Sparkles,
} from 'lucide-react';
import WeatherWidget from '../WeatherWidget';

function formatINR(amount) {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Displays structured AI itinerary: summary, costs, days, hotels, food, transport.
 */
export default function ItineraryResultCards({ plan, meta, weather }) {
  if (!plan) return null;

  const cost = plan.estimatedCost;

  return (
    <div id="smart-planner-print" className="space-y-8">
      {/* Summary */}
      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-6 md:p-8 border border-teal-100 dark:border-teal-900">
        <div className="flex items-start gap-3">
          <Sparkles className="w-8 h-8 text-teal-500 shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              {meta?.destination || 'Your Trip'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{plan.summary}</p>
            {plan.weatherNote && (
              <p className="mt-3 text-sm text-teal-700 dark:text-teal-300 flex items-center gap-2">
                <Cloud className="w-4 h-4" /> {plan.weatherNote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Weather */}
      {weather && Array.isArray(weather) && weather.length > 0 && (
        <WeatherWidget weather={weather} />
      )}

      {/* Estimated cost */}
      {cost && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-full sm:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-lg">
            <p className="text-xs uppercase font-bold text-gray-500 mb-1">Total estimated cost</p>
            <p className="text-3xl font-black text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <IndianRupee className="w-7 h-7" />
              {formatINR(cost.total).replace('₹', '')}
            </p>
            {cost.perPerson && (
              <p className="text-sm text-gray-500 mt-1">
                ~{formatINR(cost.perPerson)} per person
              </p>
            )}
          </div>
          {cost.breakdown &&
            Object.entries(cost.breakdown).map(([key, val]) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800"
              >
                <p className="text-xs uppercase font-bold text-gray-500 capitalize">{key}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {formatINR(val)}
                </p>
              </div>
            ))}
        </section>
      )}

      {/* Day-wise itinerary */}
      <section>
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sun className="w-6 h-6 text-orange-500" />
          Day-wise Itinerary
        </h3>
        <div className="space-y-4">
          {(plan.dailyItinerary || []).map((day) => (
            <article
              key={day.day}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400">
                  Day {day.day}: {day.title}
                </h4>
                {day.estimatedDailyCost != null && (
                  <span className="text-sm font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full">
                    {formatINR(day.estimatedDailyCost)} / day
                  </span>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {['morning', 'afternoon', 'evening'].map((slot) =>
                  day[slot] ? (
                    <div
                      key={slot}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4"
                    >
                      <p className="font-bold uppercase text-xs text-gray-500 mb-2">
                        {slot}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">{day[slot]}</p>
                    </div>
                  ) : null
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attractions */}
        <CardSection icon={MapPin} title="Suggested Attractions" color="text-teal-500">
          <ul className="space-y-3">
            {(plan.attractions || []).map((a, i) => (
              <li
                key={i}
                className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition"
              >
                <Star className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{a.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{a.description}</p>
                  {a.rating && (
                    <p className="text-xs text-teal-600 mt-1">★ {a.rating}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardSection>

        {/* Hotels */}
        <CardSection icon={Hotel} title="Hotel Recommendations" color="text-orange-500">
          <ul className="space-y-3">
            {(plan.hotels || []).map((h, i) => (
              <li
                key={i}
                className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-teal-300 transition"
              >
                <p className="font-bold text-gray-900 dark:text-white">{h.name}</p>
                <p className="text-sm text-gray-500">{h.type}</p>
                <p className="text-teal-600 font-semibold mt-1">
                  {formatINR(h.pricePerNight)} / night
                </p>
                {h.note && <p className="text-xs text-gray-500 mt-1">{h.note}</p>}
              </li>
            ))}
          </ul>
        </CardSection>

        {/* Food */}
        <CardSection icon={Utensils} title="Food Suggestions" color="text-rose-500">
          <ul className="space-y-2">
            {(plan.foodSuggestions || []).map((f, i) => (
              <li key={i} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-gray-500">{f.cuisine}</p>
                </div>
                <span className="text-sm font-bold text-gray-600">{f.priceRange}</span>
              </li>
            ))}
          </ul>
        </CardSection>

        {/* Transport */}
        <CardSection icon={Bus} title="Transportation" color="text-blue-500">
          <ul className="space-y-3">
            {(plan.transportation || []).map((t, i) => (
              <li key={i} className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">{t.mode}</p>
                <p className="text-gray-600 dark:text-gray-400">{t.tip}</p>
              </li>
            ))}
          </ul>
        </CardSection>
      </div>
    </div>
  );
}

function CardSection({ icon: Icon, title, color, children }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-md">
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${color}`}>
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      {children}
    </section>
  );
}
