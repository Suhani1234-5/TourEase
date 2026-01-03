import React from "react";
import { MapPin, Star, Heart, Clock, TrendingUp, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import { useFavorites } from "../hooks/useFavorites";
import { destinations } from "../utils/destinationsData";
import { Link } from "react-router-dom";

export default function AddFavorite() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  const favoriteDestinations = destinations.filter((destination) =>
    favoriteIds.includes(destination.id)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white dark:text-white">
              Favorite Destinations
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl text-white dark:text-gray-100">
            Collect the destinations you love most, thoughtfully gathered to
            help you revisit and plan your travel.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {favoriteDestinations.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Your Collection ({favoriteDestinations.length})
              </h2>
              <Link
                to="/destinations"
                className="text-teal-600 dark:text-indigo-400 hover:text-teal-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-2 transition"
              >
                Add More Destinations →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {favoriteDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  isFavorite={isFavorite(destination.id)}
                  onToggleFavorite={() => toggleFavorite(destination.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyFavoritesState />
        )}
      </div>
    </div>
  );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate(); // ✅ ADD THIS

  return (
    <div
      onClick={() => navigate(`/destinations/${destination.id}`)} // ✅ ADD THIS
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-lg hover:shadow-xl dark:hover:shadow-xl transition-all overflow-hidden group cursor-pointer border border-transparent dark:border-gray-800"
    >
      <div
        className="h-48 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 dark:opacity-40 dark:group-hover:opacity-50 transition" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition z-10"
        >
          <Heart
            className={`w-6 h-6 transition ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {destination.name}
        </h3>

        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
            {destination.rating}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
            ({destination.reviews})
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-400" />
            Best for: {destination.bestFor}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-400" />
            Best season: {destination.season}
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-400" />
            Budget: {destination.cost}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/destinations/${destination.id}`);
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
        >
          Explore
        </button>
      </div>
    </div>
  );
}

function EmptyFavoritesState() {
  return (
    <div className="text-center py-20">
      <div className="mb-6 flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-8">
          <HeartOff className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        No Favorites Yet
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        Explore our amazing destinations and start adding your favorites by
        clicking the heart icon!
      </p>
      <Link
        to="/destinations"
        className="inline-block bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
      >
        Explore Destinations
      </Link>
    </div>
  );
}
