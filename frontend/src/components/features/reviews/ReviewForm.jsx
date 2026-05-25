import React, { useState } from "react";
import { submitReview } from "../../../services/reviewService";

const ReviewForm = ({ destinationId, refreshReviews }) => {
  const [formData, setFormData] = useState({
    username: "",
    rating: 5,
    travelerType: "Solo",
    reviewText: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Add the destinationId and current date to the payload before sending
      const reviewPayload = {
        ...formData,
        destinationId: destinationId,
        travelDate: new Date().toISOString(),
      };

      // Call your backend API
      await submitReview(destinationId, reviewPayload);

      // Clear the form
      setFormData({
        username: "",
        rating: 5,
        travelerType: "Solo",
        reviewText: "",
      });

      // Tell the parent component to fetch the updated list of reviews!
      refreshReviews();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-white">
        Write a Review
      </h3>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            pattern="[A-Za-z\s]+" // Tells the browser: letters and spaces ONLY
            title="Your name can only contain letters and spaces" // Shows up if they make a mistake
            className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Rating Dropdown */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Rating
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              // Added dark:bg-zinc-900 and dark:text-white right here!
              className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
              <option value={4}>⭐⭐⭐⭐ (4/5)</option>
              <option value={3}>⭐⭐⭐ (3/5)</option>
              <option value={2}>⭐⭐ (2/5)</option>
              <option value={1}>⭐ (1/5)</option>
            </select>
          </div>

          {/* Traveler Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Travel Style
            </label>
            <select
              name="travelerType"
              value={formData.travelerType}
              onChange={handleChange}
              // Added dark:bg-zinc-900 and dark:text-white right here!
              className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="Solo">Solo Traveler</option>
              <option value="Family">Family Trip</option>
              <option value="Couple">Couple</option>
              <option value="Friends">Group of Friends</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        {/* Review Text Area */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Your Experience
          </label>
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-teal-500 outline-none resize-none"
            placeholder="What did you love about this place?"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
