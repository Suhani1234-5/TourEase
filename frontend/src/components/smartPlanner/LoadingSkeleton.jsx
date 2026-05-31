import React from 'react';

/** Shimmer placeholders while AI generates the itinerary */
export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Generating itinerary">
      <div className="h-8 w-2/3 max-w-md bg-gray-200 dark:bg-gray-800 rounded-lg" />
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
    </div>
  );
}
