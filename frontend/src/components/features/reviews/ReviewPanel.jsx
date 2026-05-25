import { useCallback, useEffect, useState } from "react";
import { fetchReviews } from "../../../services/reviewService";
// 1. We import the fake data here so we can read the baseline numbers!
import { destinations } from "../../../utils/destinationsData";
import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";
import ReviewForm from "./ReviewForm";

// Add this right below your imports!
const MOCK_WRITTEN_REVIEWS = [
  {
    _id: "mock-1",
    username: "Sarah Jenkins",
    rating: 5,
    travelerType: "Couple",
    reviewText:
      "Absolutely breathtaking! The culture, the food, and the sights were beyond our expectations. We booked our itinerary perfectly and will definitely be coming back next year.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    likes: 124,
  },
  {
    _id: "mock-2",
    username: "Marcus T.",
    rating: 4,
    travelerType: "Solo",
    reviewText:
      "Great experience overall. It got a little crowded near the main tourist spots, but getting lost in the side streets and finding hidden cafes was the best part of my trip.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
    likes: 45,
  },
  {
    _id: "mock-3",
    username: "The Wilson Family",
    rating: 5,
    travelerType: "Family",
    reviewText:
      "A fantastic destination! There were plenty of activities, and we felt incredibly safe the entire time. If you are going in the summer, make sure to pack light!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
    likes: 89,
  },
];

const ReviewPanel = ({ destinationId, onStatsUpdate }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [distribution, setDistribution] = useState(null);

  const [selectedRating, setSelectedRating] = useState(null);

  const loadReviews = useCallback(async () => {
    try {
      const data = await fetchReviews(destinationId);

      // Filter out any real reviews that don't have text!
      const realReviews = (data.reviews || []).filter(
        (review) => review.reviewText && review.reviewText.trim() !== "",
      );
      setReviews([...realReviews, ...MOCK_WRITTEN_REVIEWS]);

      // --- THE PLATFORM ILLUSION MATH ---

      // 1. Find the baseline mock stats for this specific city
      const mockDest = destinations.find(
        (d) => String(d.id) === String(destinationId),
      );
      const baseCount = mockDest?.reviews || 1200;
      const baseRating = mockDest?.rating || 4.8;

      // 2. Generate a realistic e-commerce distribution curve for the fake reviews
      // (Roughly: 78% 5-star, 14% 4-star, 4% 3-star, 1% 2-star, 3% 1-star)
      const mock5 = Math.floor(baseCount * 0.78);
      const mock4 = Math.floor(baseCount * 0.14);
      const mock3 = Math.floor(baseCount * 0.04);
      const mock2 = Math.floor(baseCount * 0.01);
      // The remainder ensures the numbers add up exactly to the baseCount!
      const mock1 = baseCount - (mock5 + mock4 + mock3 + mock2);

      // 3. Get the REAL stats from your database
      const realDist = data.ratingDistribution || {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };
      const realTotal = data.totalReviews || 0;
      const realAvg = data.averageRating || 0;

      // 4. Combine Fake + Real
      const combinedTotal = baseCount + realTotal;
      const combinedAverage =
        (baseRating * baseCount + realAvg * realTotal) / combinedTotal;

      const combinedDistribution = {
        5: mock5 + (realDist[5] || 0),
        4: mock4 + (realDist[4] || 0),
        3: mock3 + (realDist[3] || 0),
        2: mock2 + (realDist[2] || 0),
        1: mock1 + (realDist[1] || 0),
      };

      // Update the chart at the top with our massive combined numbers
      setAverageRating(combinedAverage.toFixed(1));
      setTotalReviews(combinedTotal);
      setDistribution(combinedDistribution);

      // Send the REAL numbers up to the Parent Page (because we already taught the Parent how to do its own illusion math earlier!)
      if (onStatsUpdate) {
        onStatsUpdate(realAvg, realTotal);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  }, [destinationId, onStatsUpdate]);

  useEffect(() => {
    loadReviews();
    setSelectedRating(null);
  }, [loadReviews]);

  const filteredReviews = selectedRating
    ? reviews.filter(
        (review) => Number(review.rating) === Number(selectedRating),
      )
    : reviews;

  return (
    <section className="mt-20">
      {/* 1. Review Distribution Breakdown (Now uses 1000+ numbers!) */}
      <ReviewSummary
        averageRating={averageRating}
        totalReviews={totalReviews}
        distribution={distribution}
      />

      {/* 2. Review Form */}
      <div className="mb-12">
        <ReviewForm
          destinationId={destinationId}
          refreshReviews={loadReviews}
        />
      </div>

      {/* 3. Flipkart-style Filter Selection Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-3">
          Filter Reviews
        </h3>
        <div className="flex flex-wrap gap-2">
          {/* Note: This uses reviews.length so it only shows the count of REAL written reviews! */}
          <button
            onClick={() => setSelectedRating(null)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              selectedRating === null
                ? "bg-teal-500 border-teal-500 text-white shadow-sm"
                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            {/* Swapped reviews.length for totalReviews here! */}
            All Reviews ({totalReviews})
          </button>

          {[5, 4, 3, 2, 1].map((star) => {
            // This only counts REAL reviews for the filtering buttons
            const count = reviews.filter(
              (r) => Number(r.rating) === star,
            ).length;

            return (
              <button
                key={star}
                onClick={() =>
                  setSelectedRating(selectedRating === star ? null : star)
                }
                disabled={count === 0}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                  count === 0
                    ? "opacity-40 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-400"
                    : selectedRating === star
                      ? "bg-teal-500 border-teal-500 text-white shadow-sm"
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {star} ★ ({count})
              </button>
            );
          })}
        </div>

        {selectedRating && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 flex items-center gap-2">
            Showing only {selectedRating}-star reviews.
            <button
              onClick={() => setSelectedRating(null)}
              className="text-teal-500 hover:underline font-semibold"
            >
              Clear filter
            </button>
          </p>
        )}
      </div>

      {/* 4. Filtered Reviews List */}
      <div className="grid gap-6 mb-8">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              refreshReviews={loadReviews}
            />
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              No reviews matching the selected filter layout.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewPanel;
