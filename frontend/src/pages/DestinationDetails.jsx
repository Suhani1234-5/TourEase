import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, TrendingUp } from "lucide-react";
import { destinations } from "../utils/destinationsData";
import { useFavorites } from "../hooks/useFavorites";

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const destination = destinations.find((d) => String(d.id) === String(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <p className="text-gray-900 dark:text-white font-semibold">Destination not found.</p>
          <button
            onClick={() => navigate("/destinations")}
            className="mt-4 w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div
                className="h-[320px] sm:h-[420px] bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
            </div>

            <div className="mt-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {destination.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{destination.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">({destination.reviews} reviews)</span>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <InfoChip icon={MapPin} label={`Best for: ${destination.bestFor}`} />
                <InfoChip icon={Clock} label={`Season: ${destination.season}`} />
                <InfoChip icon={TrendingUp} label={`Budget: ${destination.cost}`} />
              </div>

              {/* Optional: description field ho to show */}
              {destination.description && (
                <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {destination.description}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <p className="text-gray-900 dark:text-white font-bold text-xl">Quick actions</p>

              <button
                onClick={() => toggleFavorite(destination.id)}
                className="mt-4 w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {isFavorite(destination.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                className="mt-3 w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
              >
                Plan this Trip
              </button>

              <button
                onClick={() => navigate("/destinations")}
                className="mt-3 w-full text-teal-600 dark:text-indigo-400 font-semibold hover:underline"
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

function InfoChip({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3">
      <Icon className="w-5 h-5 text-teal-600 dark:text-indigo-400" />
      <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
    </div>
  );
}
