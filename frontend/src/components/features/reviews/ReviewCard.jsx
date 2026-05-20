import { useState } from "react";
import { deleteReview, likeReview } from "../../../services/reviewService";
// Assuming you have lucide-react installed for your icons!
import { ThumbsUp, Trash2 } from "lucide-react";

const ReviewCard = ({ review, refreshReviews }) => {
  // 1. Create local state for the likes so it updates instantly on the screen
  const [likesCount, setLikesCount] = useState(review.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const CURRENT_LOGGED_IN_USER = "John Doe";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(review._id);
        if (refreshReviews) {
          refreshReviews();
        }
      } catch (error) {
        console.error("Failed to delete review:", error);
        alert("Could not delete the review. Please try again.");
      }
    }
  };

  // 2. The new Like function
  const handleLike = async () => {
    if (isLiked) return; // Prevent spam clicking

    // Optimistic Update: Change the UI instantly before the server responds
    setIsLiked(true);
    setLikesCount((prev) => prev + 1);

    try {
      await likeReview(review._id);
    } catch (error) {
      console.error("Failed to like review:", error);
      // If it fails, revert the UI back
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-zinc-800 dark:text-white flex items-center gap-2">
            {review.username}
          </h3>
          <p className="text-sm text-zinc-500">
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-1 text-yellow-500 font-bold">
          {"⭐".repeat(Math.round(review.rating || 5))} {review.rating}
        </div>
      </div>

      <span className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-semibold mb-4 self-start border border-teal-100 dark:border-teal-800/50">
        {review.travelerType} Traveler
      </span>

      {review.reviewText && (
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed flex-grow text-sm">
          {review.reviewText}
        </p>
      )}

      {/* Action Bar (Helpful & Delete) */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        {/* Helpful Button */}
        <button
          onClick={handleLike}
          disabled={isLiked}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            isLiked
              ? "text-teal-600 dark:text-teal-400 cursor-default"
              : "text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          {isLiked ? "Helpful" : "Helpful?"}
          {likesCount > 0 && (
            <span className="ml-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-xs">
              {likesCount}
            </span>
          )}
        </button>

        {/* Only show the Delete Button if the current user owns this review! */}
        {review.username === CURRENT_LOGGED_IN_USER && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-red-500 font-medium text-sm transition-colors"
            title="Delete Review"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
