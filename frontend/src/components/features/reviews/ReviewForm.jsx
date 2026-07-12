import React, { useState } from "react";
import { submitReview } from "../../../services/reviewService";
import { Send, CheckCircle2, Star, MapPin, User } from "lucide-react";

/* ──────────────────────────────────────────
   Interactive star picker
────────────────────────────────────────── */

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="focus:outline-none p-0.5 rounded transition-transform duration-150"
            style={{ transform: n <= active ? "scale(1.18)" : "scale(1)" }}
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-8 h-8 transition-all duration-150 ${
                n <= active
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>

      <span
        className={`text-sm font-semibold transition-colors duration-200 ${
          active
            ? "text-teal-600 dark:text-teal-400"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {RATING_LABELS[active] || "Select a rating"}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────
   Traveler Type
────────────────────────────────────────── */

const TRAVELER_TYPES = [
  { value: "Solo", emoji: "🧳" },
  { value: "Couple", emoji: "💑" },
  { value: "Family", emoji: "👨‍👩‍👧" },
  { value: "Friends", emoji: "👫" },
  { value: "Business", emoji: "💼" },
];

function TravelerPills({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRAVELER_TYPES.map((t) => {
        const active = value === t.value;

        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 ${
              active
                ? "bg-teal-50 dark:bg-teal-900/25 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <span>{t.emoji}</span>
            {t.value}
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Review Form
────────────────────────────────────────── */

const ReviewForm = ({ destinationId, refreshReviews }) => {
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const [formData, setFormData] = useState({
    username: currentUser ? currentUser.name : "",
    rating: 5,
    travelerType: "Solo",
    reviewText: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (formData.rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    if (formData.reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewPayload = {
        ...formData,
        rating: Number(formData.rating),
        destinationId,
        travelDate: new Date().toISOString(),
      };

      await submitReview(reviewPayload);

      // Clear the form
      setFormData({
        username: currentUser ? currentUser.name : "",
        rating: 5,
        travelerType: "Solo",
        reviewText: "",
      });

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      if (refreshReviews) {
        refreshReviews();
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold mb-2 text-zinc-800 dark:text-white">
          Share Your Experience
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          Join TourEase to write reviews, like other travelers' feedback, and
          plan your perfect trip.
        </p>

        <a
          href="/auth?mode=login"
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
        >
          Log In to Write a Review
        </a>
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl text-sm border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 border-gray-200 dark:border-gray-700 focus:border-teal-400 dark:focus:border-teal-600 focus:ring-2 focus:ring-teal-400/20 dark:focus:ring-teal-600/20";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
          <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Write a Review
          </h3>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Share your experience to help other travellers.
          </p>
        </div>
      </div>

      {submitted && (
        <div className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Thank you! Your review has been posted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Name
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
            className={inputBase}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Rating
          </label>

          <StarPicker
            value={formData.rating}
            onChange={(value) =>
              setFormData({
                ...formData,
                rating: value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Travel Style
          </label>

          <TravelerPills
            value={formData.travelerType}
            onChange={(value) =>
              setFormData({
                ...formData,
                travelerType: value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Experience
          </label>

          <textarea
            name="reviewText"
            rows={4}
            value={formData.reviewText}
            onChange={handleChange}
            className={`${inputBase} resize-none`}
            placeholder="What made this destination special?"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Posting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;