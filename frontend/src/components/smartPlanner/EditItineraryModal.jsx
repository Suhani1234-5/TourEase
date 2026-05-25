import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TRAVEL_TYPES } from '../../utils/plannerConstants';

/**
 * Modal to edit saved itinerary metadata (destination, budget, days, type).
 */
export default function EditItineraryModal({ itinerary, onClose, onSave }) {
  const [form, setForm] = useState({
    destination: itinerary.destination || '',
    budgetAmount: itinerary.budgetAmount || '',
    days: itinerary.days || 1,
    travelType: itinerary.travelType || 'budget',
    travelers: itinerary.travelers || 1,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        destination: form.destination,
        budgetAmount: Number(form.budgetAmount),
        days: Number(form.days),
        travelType: form.travelType,
        travelers: Number(form.travelers),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">Edit itinerary</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Destination
            </label>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">Budget (INR)</label>
              <input
                type="number"
                value={form.budgetAmount}
                onChange={(e) => setForm({ ...form, budgetAmount: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Days</label>
              <input
                type="number"
                min="1"
                max="30"
                value={form.days}
                onChange={(e) => setForm({ ...form, days: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Travel type</label>
            <select
              value={form.travelType}
              onChange={(e) => setForm({ ...form, travelType: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              {TRAVEL_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Travelers</label>
            <input
              type="number"
              min="1"
              value={form.travelers}
              onChange={(e) => setForm({ ...form, travelers: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
