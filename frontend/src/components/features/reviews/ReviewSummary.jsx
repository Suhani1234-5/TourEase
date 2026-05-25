import React from "react";

const ReviewSummary = ({ averageRating, totalReviews, distribution }) => {
  // Fallback data just in case the backend hasn't loaded yet
  const dist = distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 lg:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8 flex flex-col md:flex-row items-center gap-8">
      {/* Left Column: Big Average Number */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 md:border-r border-zinc-200 dark:border-zinc-800 pb-6 md:pb-0">
        <h2 className="text-6xl font-bold text-zinc-800 dark:text-white mb-2">
          {averageRating}
        </h2>
        <div className="text-yellow-500 text-2xl mb-2 tracking-widest">
          {/* Dynamically render the big stars based on the average */}
          {"⭐".repeat(Math.round(averageRating || 0))}
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
          {totalReviews} Ratings & Reviews
        </p>
      </div>

      {/* Right Column: The Bar Charts */}
      <div className="w-full md:w-2/3 flex flex-col space-y-3">
        {/* We map through an array [5,4,3,2,1] to render the rows from top to bottom */}
        {[5, 4, 3, 2, 1].map((star) => {
          const count = dist[star] || 0;
          // Calculate the width of the bar (protect against dividing by zero)
          const percentage =
            totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              {/* Star Label */}
              <div className="flex items-center justify-end gap-1 w-10 text-zinc-700 dark:text-zinc-300 font-bold">
                {star} <span className="text-zinc-400 text-xs">★</span>
              </div>

              {/* Progress Bar Background */}
              <div className="flex-1 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                {/* Progress Bar Fill (The colored part) */}
                <div
                  // Green for good, Yellow for ok, Red for bad
                  className={`h-full rounded-full transition-all duration-1000 ${
                    star >= 4
                      ? "bg-green-500"
                      : star === 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Review Count Number */}
              <div className="w-8 text-right text-zinc-500 dark:text-zinc-500 text-xs font-medium">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSummary;
