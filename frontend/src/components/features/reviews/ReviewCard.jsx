import { useState } from "react";
import { deleteReview, likeReview } from "../../../services/reviewService";
import { ThumbsUp, Trash2, Star } from "lucide-react";

/* ── Star display ── */
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${
            n <= Math.round(rating || 0)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Avatar colours — teal/indigo/amber shades from the app palette ── */
const AVATAR_COLORS = [
  "bg-teal-500",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-emerald-500",
];

function avatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name = "") {
  return name.trim().split(" ").map((w) => w[0]?.toUpperCase() || "").slice(0, 2).join("");
}

const TRAVELER_ICONS = {
  Solo: "🧳", Couple: "💑", Family: "👨‍👩‍👧", Friends: "👫", Business: "💼",
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0)  return "Today";
  if (days === 1)  return "Yesterday";
  if (days < 30)   return `${days}d ago`;
  const m = Math.floor(days / 30);
  if (m < 12)      return `${m}mo ago`;
  return `${Math.floor(m / 12)}y ago`;
}

/* ── Main card ── */
const ReviewCard = ({ review, refreshReviews }) => {
  const [likesCount, setLikesCount] = useState(review.likes || 0);
  const [isLiked, setIsLiked]       = useState(false);
  const isMock = review._id && String(review._id).startsWith("mock");

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isOwner = currentUser && (
    (review.userId && (review.userId === currentUser.id || review.userId._id === currentUser.id)) ||
    (!review.userId && review.username === currentUser.name)
  );

  const handleDelete = async () => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteReview(review._id);
      refreshReviews?.();
    } catch {
      alert("Could not delete the review. Please try again.");
    }
  };

  const handleLike = async () => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    if (!isAuthenticated) {
      alert("Please log in to like reviews.");
      return;
    }
    if (isLiked) return; // Prevent spam clicking

    // Optimistic Update: Change the UI instantly before the server responds
    setIsLiked(true);
    setLikesCount((p) => p + 1);
    try {
      await likeReview(review._id);
    } catch {
      setIsLiked(false);
      setLikesCount((p) => p - 1);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-250 flex flex-col h-full">
      {/* Top row: avatar + name + date */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${avatarColor(review.username)}`}
        >
          {getInitials(review.username)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {review.username}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
              {timeAgo(review.createdAt)}
            </span>
          </div>

          {/* Stars + numeric rating */}
          <div className="flex items-center gap-2 mt-0.5">
            <StarRow rating={review.rating} />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {Number(review.rating).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Traveler badge */}
      <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/60 text-teal-700 dark:text-teal-400 text-xs font-semibold mb-3">
        {TRAVELER_ICONS[review.travelerType] || "✈️"}
        {review.travelerType || "Solo"} Traveler
      </span>

      {/* Review text */}
      {review.reviewText && (
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
          {review.reviewText}
        </p>
      )}

      {/* Action bar */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <button
          onClick={handleLike}
          disabled={isLiked || isMock}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-200 ${
            isLiked
              ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 cursor-default"
              : "border-transparent text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
          } disabled:cursor-default`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
          {isLiked ? "Helpful" : "Helpful?"}
          {likesCount > 0 && (
            <span className="ml-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full text-xs">
              {likesCount}
            </span>
          )}
        </button>

        {/* Only show the Delete Button if the current user owns this review! */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/15 transition-all duration-200"
            title="Delete review"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
