import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

/* ── Smooth animated number on first render ── */
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) return;
    const duration = 1000;
    const steps = 36;
    const increment = target / steps;
    let count = 0;
    let current = 0;
    const timer = setInterval(() => {
      count++;
      current = Math.min(current + increment, target);
      setDisplay(Math.floor(current));
      if (count >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

/* ── Stars (fills fractional last star) ── */
function StarRow({ rating, size = "sm" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${sz} transition-colors ${
            n <= Math.round(Number(rating || 0))
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Individual rating bar ── */
function RatingBar({ star, count, totalReviews }) {
  const [width, setWidth] = useState(0);
  const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);

  const barClass =
    star >= 4
      ? "bg-teal-500 dark:bg-teal-500"
      : star === 3
      ? "bg-amber-400 dark:bg-amber-400"
      : "bg-rose-400 dark:bg-rose-500";

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Label */}
      <div className="flex items-center gap-1 w-9 justify-end shrink-0">
        <span className="font-semibold text-gray-600 dark:text-gray-400 text-xs">
          {star}
        </span>
        <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
      </div>

      {/* Track */}
      <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barClass}`}
          style={{ width: `${width}%` }}
        />
      </div>

      {/* Count */}
      <span className="text-xs text-gray-400 dark:text-gray-500 w-10 text-right shrink-0">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

/* ── Main component ── */
const ReviewSummary = ({ averageRating, totalReviews, distribution }) => {
  const dist = distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const avg = Number(averageRating || 0);

  const scoreLabel =
    avg >= 4.5 ? "Outstanding" :
    avg >= 4   ? "Excellent"   :
    avg >= 3.5 ? "Very Good"   :
    avg >= 3   ? "Good"        : "Mixed";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
      {/* Section heading */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
          <Star className="w-4 h-4 text-teal-600 dark:text-teal-400 fill-teal-600 dark:fill-teal-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Ratings &amp; Reviews
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* ── Left: big score ── */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-44">
          <span className="text-6xl font-black text-gray-900 dark:text-gray-100 leading-none">
            {avg.toFixed(1)}
          </span>

          <div className="mt-2">
            <StarRow rating={avg} size="lg" />
          </div>

          <span className="mt-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
            {scoreLabel}
          </span>

          <span className="mt-1 text-xs text-gray-400 dark:text-gray-500 text-center leading-snug">
            <AnimatedNumber value={totalReviews} /> total ratings
          </span>
        </div>

        {/* Divider (desktop) */}
        <div className="hidden md:block w-px self-stretch bg-gray-100 dark:bg-gray-800" />

        {/* ── Right: bars ── */}
        <div className="flex-1 w-full flex flex-col gap-2.5">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBar
              key={star}
              star={star}
              count={dist[star] || 0}
              totalReviews={totalReviews || 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
