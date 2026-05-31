import React from 'react';
import {
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { TRAVEL_TYPES, INTEREST_OPTIONS } from '../../utils/plannerConstants';

/**
 * Smart planner input form — destination, budget, days, travel type, interests, travelers.
 */
export default function PlannerForm({
  form,
  errors,
  loading,
  onChange,
  onToggleInterest,
  onSubmit,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6"
    >
      {/* Destination */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="w-4 h-4 text-teal-500" />
          Destination
        </label>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => onChange('destination', e.target.value)}
          placeholder="e.g. Goa, Paris, Manali"
          className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none focus:ring-2 focus:ring-teal-500/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
            errors.destination ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
          }`}
        />
        {errors.destination && (
          <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Budget (INR) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
            <IndianRupee className="w-4 h-4 text-teal-500" />
            Total Budget (INR)
          </label>
          <input
            type="number"
            min="1000"
            value={form.budget}
            onChange={(e) => onChange('budget', e.target.value)}
            placeholder="e.g. 50000"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none focus:ring-2 focus:ring-teal-500/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
              errors.budget ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            }`}
          />
          {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
        </div>

        {/* Days */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            Number of Days
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={form.days}
            onChange={(e) => onChange('days', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none focus:ring-2 focus:ring-teal-500/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
              errors.days ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            }`}
          />
          {errors.days && <p className="mt-1 text-sm text-red-500">{errors.days}</p>}
        </div>
      </div>

      {/* Travel type */}
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 block">
          Travel Type
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange('travelType', t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                form.travelType === t.id
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="mr-1">{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>
        {errors.travelType && (
          <p className="mt-1 text-sm text-red-500">{errors.travelType}</p>
        )}
      </div>

      {/* Travelers */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
          <Users className="w-4 h-4 text-teal-500" />
          Travelers
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChange('travelers', Math.max(1, form.travelers - 1))}
            className="w-11 h-11 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600"
          >
            −
          </button>
          <span className="text-3xl font-black text-gray-900 dark:text-white min-w-[3rem] text-center">
            {form.travelers}
          </span>
          <button
            type="button"
            onClick={() => onChange('travelers', Math.min(20, form.travelers + 1))}
            className="w-11 h-11 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600"
          >
            +
          </button>
        </div>
        {errors.travelers && (
          <p className="mt-1 text-sm text-red-500">{errors.travelers}</p>
        )}
      </div>

      {/* Interests */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
          <Sparkles className="w-4 h-4 text-orange-500" />
          Interests
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = form.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => onToggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70 dark:focus-visible:ring-teal-300 ${
                  selected
                    ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/25 hover:bg-orange-400'
                    : 'bg-white dark:bg-gray-800/90 border-gray-300 dark:border-gray-400 text-gray-700 dark:text-gray-100 hover:border-teal-400 dark:hover:border-teal-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-red-500">{errors.interests}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-500/30 active:scale-[0.98]'
        }`}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating your trip...
          </>
        ) : (
          <>
            Generate AI Itinerary
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
