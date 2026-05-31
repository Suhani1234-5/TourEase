import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, ChevronDown, Send, User } from "lucide-react";

/* ─── helpers ─────────────────────────────────────────── */
const STORAGE_KEY = (id) => `tourease_reviews_${id}`;
const HELPFUL_KEY = (id) => `tourease_helpful_${id}`;

function loadReviews(destId) {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY(destId))) || [];
  } catch {
    return [];
  }
}

function saveReviews(destId, reviews) {
  localStorage.setItem(STORAGE_KEY(destId), JSON.stringify(reviews));
}

function loadHelpful(destId) {
  try {
    return JSON.parse(localStorage.getItem(HELPFUL_KEY(destId))) || {};
  } catch {
    return {};
  }
}

function saveHelpful(destId, helpful) {
  localStorage.setItem(HELPFUL_KEY(destId), JSON.stringify(helpful));
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");
}

const AVATAR_COLORS = [
  "bg-teal-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-emerald-500",
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/* ─── StarPicker ───────────────────────────────────────── */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform hover:scale-125"
          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              n <= (hovered || value)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── StarDisplay ──────────────────────────────────────── */
function StarDisplay({ rating, size = "sm" }) {
  const sz = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${sz} ${
            n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── RatingBar ────────────────────────────────────────── */
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-4 text-gray-600 dark:text-gray-400 text-right font-medium">{star}</span>
      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-gray-500 dark:text-gray-400 text-xs">{count}</span>
    </div>
  );
}

/* ─── ReviewCard ───────────────────────────────────────── */
function ReviewCard({ review, helpfulMap, onHelpful }) {
  const voted = helpfulMap[review.id];
  return (
    <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-all hover:shadow-md hover:border-teal-400/40">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${avatarColor(
            review.author
          )}`}
        >
          {getInitials(review.author)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {review.author}
            </span>
            <StarDisplay rating={review.rating} />
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              {formatDate(review.date)}
            </span>
          </div>

          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {review.text}
          </p>

          {/* Helpful */}
          <button
            onClick={() => onHelpful(review.id)}
            className={`mt-3 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              voted
                ? "bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400"
                : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400"
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${voted ? "fill-teal-500 text-teal-500" : ""}`} />
            Helpful{review.helpful > 0 ? ` (${review.helpful})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────── */
export default function ReviewsPanel({ destination }) {
  const destId = destination.id;

  const [reviews, setReviews] = useState(() => loadReviews(destId));
  const [helpfulMap, setHelpfulMap] = useState(() => loadHelpful(destId));
  const [visibleCount, setVisibleCount] = useState(3);

  // form state
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Persist whenever reviews change
  useEffect(() => {
    saveReviews(destId, reviews);
  }, [reviews, destId]);

  useEffect(() => {
    saveHelpful(destId, helpfulMap);
  }, [helpfulMap, destId]);

  // Recalculate when destination changes
  useEffect(() => {
    setReviews(loadReviews(destId));
    setHelpfulMap(loadHelpful(destId));
    setVisibleCount(3);
    setSubmitted(false);
    setAuthor("");
    setRating(0);
    setText("");
    setError("");
  }, [destId]);

  /* ── Rating breakdown ── */
  const allReviews = [
    ...reviews,
    // seed the destination's own aggregate as background
  ];

  const totalCount = allReviews.length;

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
  }));

  const avgRating =
    totalCount > 0
      ? (allReviews.reduce((s, r) => s + r.rating, 0) / totalCount).toFixed(1)
      : destination.rating;

  /* ── Submit ── */
  function handleSubmit(e) {
    e.preventDefault();
    if (!author.trim()) return setError("Please enter your name.");
    if (rating === 0) return setError("Please select a star rating.");
    if (text.trim().length < 10) return setError("Review must be at least 10 characters.");

    setError("");
    const newReview = {
      id: Date.now().toString(),
      author: author.trim(),
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
      helpful: 0,
    };

    setReviews((prev) => [newReview, ...prev]);
    setAuthor("");
    setRating(0);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  /* ── Helpful toggle ── */
  function handleHelpful(reviewId) {
    setHelpfulMap((prev) => {
      const alreadyVoted = prev[reviewId];
      const updated = { ...prev, [reviewId]: !alreadyVoted };
      return updated;
    });

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, helpful: helpfulMap[reviewId] ? r.helpful - 1 : r.helpful + 1 }
          : r
      )
    );
  }

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <section
      id="reviews-panel"
      className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
          <Star className="w-5 h-5 text-teal-600 dark:text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Tourist Reviews
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {reviews.length > 0
              ? `${reviews.length} traveller review${reviews.length !== 1 ? "s" : ""}`
              : "Be the first to share your experience!"}
          </p>
        </div>
      </div>

      {/* ── Rating Summary ── */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 p-5 bg-gradient-to-br from-teal-50 to-gray-50 dark:from-teal-900/20 dark:to-gray-800/40 rounded-xl border border-teal-100 dark:border-teal-800/40">
        {/* Big number */}
        <div className="flex flex-col items-center justify-center shrink-0 min-w-[100px]">
          <span className="text-5xl font-black text-gray-900 dark:text-gray-100">{avgRating}</span>
          <StarDisplay rating={Math.round(Number(avgRating))} size="md" />
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {destination.reviews.toLocaleString()} total ratings
          </span>
        </div>

        {/* Bars */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          {breakdown.map(({ star, count }) => (
            <RatingBar key={star} star={star} count={count} total={totalCount} />
          ))}
        </div>
      </div>

      {/* ── Write a Review Form ── */}
      <div className="mb-8 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-500 dark:text-indigo-600" />
          Write a Review
        </h3>

        {submitted && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-teal-500/10 border border-teal-400/30 text-teal-700 dark:text-teal-300 text-sm font-medium animate-fadeIn">
            ✅ Thank you! Your review has been posted.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <input
              id="review-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition"
            />
          </div>

          {/* Star Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Rating
            </label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Review
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Tell other travellers about your experience..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-rose-500 dark:text-rose-400 font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="submit-review-btn"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 dark:bg-indigo-600 dark:hover:bg-indigo-800 dark:active:bg-indigo-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-teal-500/30 hover:shadow-md"
          >
            <Send className="w-4 h-4" />
            Post Review
          </button>
        </form>
      </div>

      {/* ── Reviews List ── */}
      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
            <Star className="w-8 h-8 text-teal-500/50" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No reviews yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Share your experience above to help other travellers!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              destId={destId}
              helpfulMap={helpfulMap}
              onHelpful={handleHelpful}
            />
          ))}

          {reviews.length > visibleCount && (
            <button
              onClick={() => setVisibleCount((v) => v + 3)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition text-sm font-medium"
            >
              <ChevronDown className="w-4 h-4" />
              Load more ({reviews.length - visibleCount} remaining)
            </button>
          )}
        </div>
      )}
    </section>
  );
}
