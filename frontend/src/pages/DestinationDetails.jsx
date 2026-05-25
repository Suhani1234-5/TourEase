import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, TrendingUp } from "lucide-react";
import { destinations } from "../utils/destinationsData";
import { useFavorites } from "../hooks/useFavorites";
import ReviewPanel from "../components/features/reviews/ReviewPanel";

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  // 1. Find the destination FIRST!
  const destination = destinations.find((d) => String(d.id) === String(id));

  // 2. NOW you can use it to set your default state!
  const [liveRating, setLiveRating] = useState(destination?.rating || 0);
  const [liveReviewsCount, setLiveReviewsCount] = useState(
    destination?.reviews || 0,
  );

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <button
          onClick={() => navigate("/destinations")}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div
                className="h-[420px] bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-3xl font-bold">{destination.name}</h1>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{liveRating}</span>{" "}
              {/* Changed! */}
              <span className="text-gray-500 dark:text-gray-400">
                ({liveReviewsCount} reviews) {/* Changed! */}
              </span>
            </div>

            {/* Info Chips */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <InfoChip
                icon={MapPin}
                label={`Best for: ${destination.bestFor}`}
              />
              <InfoChip icon={Clock} label={`Season: ${destination.season}`} />
              <InfoChip
                icon={TrendingUp}
                label={`Budget: ${destination.cost}`}
              />
            </div>

            {/* Overview */}
            {destination.overview && (
              <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-2">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {destination.overview}
                </p>
              </div>
            )}

            {/* Highlights */}
            {destination.highlights && (
              <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-3">Highlights</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {destination.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <ReviewPanel
                destinationId={destination.id || destination._id}
                onStatsUpdate={(avg, total) => {
                  // Grab the baseline numbers
                  const baseRating = destination?.rating || 4.8;
                  const baseCount = destination?.reviews || 1200;

                  if (total > 0) {
                    // Combine them!
                    const combinedCount = baseCount + total;
                    const combinedRating =
                      (baseRating * baseCount + avg * total) / combinedCount;

                    setLiveRating(combinedRating.toFixed(1));
                    setLiveReviewsCount(combinedCount);
                  } else {
                    // Fallback to baseline
                    setLiveRating(baseRating);
                    setLiveReviewsCount(baseCount);
                  }
                }}
              />
            </div>
          </div>{" "}
          {/* <--- END OF LEFT SECTION */}
          {/* Right Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <p className="text-xl font-bold mb-4">Quick actions</p>

              <button
                onClick={() => toggleFavorite(destination.id)}
                className="w-full bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                {isFavorite(destination.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>

              <button
onClick={() =>
  navigate("/trip-planner", {
    state: { destinationName: destination.name },
  })
}
className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold transition"
              >
                Plan this Trip
              </button>

              <button
                onClick={() => navigate("/destinations")}
                className="mt-3 w-full text-teal-600 dark:text-indigo-600 font-semibold hover:underline"
              >
                Explore more destinations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, label }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
      <Icon className="w-5 h-5 text-teal-600 dark:text-indigo-600" />
      <span className="text-sm text-gray-800 dark:text-gray-200">
        {label}
      </span>
    </div>
  );
}
