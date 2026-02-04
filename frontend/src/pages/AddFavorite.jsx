import React, { useState } from "react";
import { MapPin, Star, Heart, Clock, TrendingUp, HeartOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { destinations } from "../utils/destinationsData";

export default function AddFavorite() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  const favoriteDestinations = destinations.filter(
    (destination) =>
      favoriteIds.includes(destination.id) &&
      destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold">
            Favorite Destinations
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mt-4">
            Collect the destinations you love most, thoughtfully gathered to
            help you revisit and plan your travel.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {favoriteIds.length > 0 ? (
          <>
            {/* Header + Search */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Your Collection ({favoriteDestinations.length})
              </h2>

              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
            </div>

            {/* Favorites Grid */}
            {favoriteDestinations.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {favoriteDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    isFavorite={isFavorite(destination.id)}
                    onToggleFavorite={() =>
                      toggleFavorite(destination.id)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
                No matching destinations found.
              </p>
            )}
          </>
        ) : (
          <EmptyFavoritesState />
        )}
      </div>
    </div>
  );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/destinations/${destination.id}`)}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer"
    >
      <div
        className="h-48 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2"
        >
          <Heart
            className={`w-6 h-6 ${
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
          <span className="ml-2 font-semibold">
            {destination.rating}
          </span>
          <span className="text-gray-500 text-sm ml-2">
            ({destination.reviews})
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Best for: {destination.bestFor}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Best season: {destination.season}
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Budget: {destination.cost}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/destinations/${destination.id}`);
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold"
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
      <HeartOff className="w-16 h-16 mx-auto text-gray-400 mb-6" />
      <h2 className="text-3xl font-bold mb-4 dark:text-white">No Favorites Yet</h2>
      <p className="text-xl text-gray-600 mb-8">
        Explore destinations and add favorites using the heart icon.
      </p>
      <Link
        to="/destinations"
        className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold"
      >
        Explore Destinations
      </Link>
    </div>
  );
}
