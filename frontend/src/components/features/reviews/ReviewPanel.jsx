import { useCallback, useEffect, useState } from "react";
import { fetchReviews } from "../../../services/reviewService";
import { destinations } from "../../../utils/destinationsData";
import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";
import ReviewForm from "./ReviewForm";
import { SlidersHorizontal } from "lucide-react";

/* ── Seed mock reviews ── */
const MOCK_WRITTEN_REVIEWS = [
  {
    _id: "mock-1",
    username: "Sarah Jenkins",
    rating: 5,
    travelerType: "Couple",
    reviewText:
      "Absolutely breathtaking! The culture, the food, and the sights were beyond our expectations. We booked our itinerary perfectly and will definitely be coming back next year.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    likes: 124,
  },
  {
    _id: "mock-2",
    username: "Marcus T.",
    rating: 4,
    travelerType: "Solo",
    reviewText:
      "Great experience overall. It got a little crowded near the main tourist spots, but getting lost in the side streets and finding hidden cafes was the best part of my trip.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    likes: 45,
  },
  {
    _id: "mock-3",
    username: "The Wilson Family",
    rating: 5,
    travelerType: "Family",
    reviewText:
      "A fantastic destination! There were plenty of activities, and we felt incredibly safe the entire time. If you are going in the summer, make sure to pack light!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    likes: 89,
  },
];

/* ── Filter pill ── */
function FilterPill({ label, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 ${
        active
          ? "bg-teal-50 dark:bg-teal-900/25 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
          : disabled
          ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ── Main panel ── */
const ReviewPanel = ({ destinationId, onStatsUpdate }) => {
  const [reviews, setReviews]             = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews]   = useState(0);
  const [distribution, setDistribution]   = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const loadReviews = useCallback(async () => {
    try {
      const data = await fetchReviews(destinationId);

      const realReviews = (data.reviews || []).filter(
        (r) => r.reviewText && r.reviewText.trim() !== "",
      );
      setReviews([...realReviews, ...MOCK_WRITTEN_REVIEWS]);

      const mockDest  = destinations.find((d) => String(d.id) === String(destinationId));
      const baseCount = mockDest?.reviews || 1200;
      const baseRating = mockDest?.rating || 4.8;

      const mock5 = Math.floor(baseCount * 0.78);
      const mock4 = Math.floor(baseCount * 0.14);
      const mock3 = Math.floor(baseCount * 0.04);
      const mock2 = Math.floor(baseCount * 0.01);
      const mock1 = baseCount - (mock5 + mock4 + mock3 + mock2);

      const realDist  = data.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      const realTotal = data.totalReviews || 0;
      const realAvg   = data.averageRating || 0;

      const combinedTotal   = baseCount + realTotal;
      const combinedAverage = (baseRating * baseCount + realAvg * realTotal) / combinedTotal;

      setAverageRating(combinedAverage.toFixed(1));
      setTotalReviews(combinedTotal);
      setDistribution({
        5: mock5 + (realDist[5] || 0),
        4: mock4 + (realDist[4] || 0),
        3: mock3 + (realDist[3] || 0),
        2: mock2 + (realDist[2] || 0),
        1: mock1 + (realDist[1] || 0),
      });

      onStatsUpdate?.(realAvg, realTotal);
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  }, [destinationId, onStatsUpdate]);

  useEffect(() => {
    loadReviews();
    setSelectedRating(null);
  }, [loadReviews]);

  const filtered = selectedRating
    ? reviews.filter((r) => Number(r.rating) === selectedRating)
    : reviews;

  return (
    <section className="mt-20">
      {/* 1. Summary */}
      <ReviewSummary
        averageRating={averageRating}
        totalReviews={totalReviews}
        distribution={distribution}
      />

      {/* 2. Form */}
      <div className="mb-10">
        <ReviewForm destinationId={destinationId} refreshReviews={loadReviews} />
      </div>

      {/* 3. Filter bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Filter by rating
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterPill
            label={`All (${totalReviews.toLocaleString()})`}
            active={selectedRating === null}
            disabled={false}
            onClick={() => setSelectedRating(null)}
          />
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Number(r.rating) === star).length;
            return (
              <FilterPill
                key={star}
                label={`${star} ★ (${count})`}
                active={selectedRating === star}
                disabled={count === 0}
                onClick={() =>
                  count > 0 && setSelectedRating(selectedRating === star ? null : star)
                }
              />
            );
          })}
        </div>

        {selectedRating && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5 flex items-center gap-1.5">
            Showing {selectedRating}-star reviews only.
            <button
              onClick={() => setSelectedRating(null)}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
            >
              Clear
            </button>
          </p>
        )}
      </div>

      {/* 4. Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.length > 0 ? (
          filtered.map((review) => (
            <ReviewCard key={review._id} review={review} refreshReviews={loadReviews} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30">
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
              No reviews for this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewPanel;
