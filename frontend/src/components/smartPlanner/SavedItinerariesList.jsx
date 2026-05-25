import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Heart,
  Trash2,
  Pencil,
  Loader2,
  Bookmark,
} from 'lucide-react';
import EditItineraryModal from './EditItineraryModal';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * List of user's saved smart itineraries with view, edit, delete, favorite.
 */
export default function SavedItinerariesList({
  itineraries,
  loading,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onView,
}) {
  const [editing, setEditing] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!itineraries?.length) {
    return (
      <div className="text-center py-16 px-6 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No saved trips yet</h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          Generate an itinerary and save it while logged in to see it here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {itineraries.map((item) => (
          <article
            key={item._id}
            className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-800 transition-all"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  {item.destination}
                </h3>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {item.travelType} · {item.days || '?'} days · {item.travelers} travelers
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggleFavorite(item._id)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`w-5 h-5 ${
                    item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(item.startDate)} — {formatDate(item.endDate)}
            </p>

            {item.generatedPlan?.summary && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {item.generatedPlan.summary}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => onView(item)}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-teal-500 text-white hover:bg-teal-600"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete this itinerary?')) onDelete(item._id);
                }}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-1 ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <EditItineraryModal
          itinerary={editing}
          onClose={() => setEditing(null)}
          onSave={async (payload) => {
            await onUpdate(editing._id, payload);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}
