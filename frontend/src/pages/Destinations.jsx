import React, { useMemo, useState, useEffect } from "react";
import { MapPin, Star, Heart, Clock, TrendingUp, Search } from "lucide-react";

import { useFavorites } from "../hooks/useFavorites";
import { destinations } from "../utils/destinationsData";
import { useNavigate } from "react-router-dom";
import { fetchReviews } from "../services/reviewService";

export default function Destinations() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const [activeFilter, setActiveFilter] = useState("All Destinations");

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const filters = useMemo(
    () => [
      { label: "All Destinations", keywords: [] },
      { label: "Budget Friendly", keywords: ["budget"] },
      { label: "Luxury", keywords: ["luxury"] },
      { label: "Beach", keywords: ["beach"] },
      { label: "Mountains", keywords: ["mountain"] },
      {
        label: "Cultural",
        keywords: ["culture", "history", "art", "museum"],
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    let result = destinations;

    if (activeFilter !== "All Destinations") {
      const filter = filters.find((f) => f.label === activeFilter);

      if (filter && filter.keywords.length) {
        result = result.filter((d) => {
          const bestFor = (d.bestFor || "").toLowerCase();

          return filter.keywords.some((kw) => bestFor.includes(kw));
        });
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          (d.bestFor || "").toLowerCase().includes(query) ||
          (d.season || "").toLowerCase().includes(query),
      );
    }

    return result;
  }, [activeFilter, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore Destinations
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Discover amazing places around the world, carefully curated for
            every type of traveler.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search destinations by name, type, or season..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none text-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter) => (
            <FilterButton
              key={filter.label}
              label={filter.label}
              active={activeFilter === filter.label}
              onClick={() => setActiveFilter(filter.label)}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-6" />

            <h3 className="text-2xl font-bold text-gray-500 dark:text-slate-400 mb-3">
              No destinations found
            </h3>

            <p className="text-gray-400 dark:text-slate-500 mb-8 max-w-md">
              Try another search or clear filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All Destinations");
              }}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition shadow-md"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isFavorite={isFavorite(destination.id)}
                onToggleFavorite={() => toggleFavorite(destination.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore?
          </h2>

          <p className="text-xl mb-10 opacity-90">
            Start planning your next adventure with TourEase
          </p>

          <button
            type="button"
            onClick={() => navigate("/trip-planner")}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-10 py-4 rounded-lg font-semibold transition text-lg shadow-md dark:bg-orange-400 dark:hover:bg-orange-500"
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition border ${
        active
          ? "bg-teal-500 text-white border-teal-500 dark:bg-indigo-600 dark:border-indigo-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-transparent dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const [liveRating, setLiveRating] = useState(destination.rating || 0);

  const [liveReviewsCount, setLiveReviewsCount] = useState(
    destination.reviews || 0,
  );

  useEffect(() => {
    const getLiveStats = async () => {
      try {
        const data = await fetchReviews(destination.id || destination._id);

        const baseRating = destination.rating || 4.8;

        const baseCount = destination.reviews || 1200;

        if (data && data.totalReviews > 0) {
          const combinedCount = baseCount + data.totalReviews;

          const combinedRating =
            (baseRating * baseCount + data.averageRating * data.totalReviews) /
            combinedCount;

          setLiveRating(combinedRating.toFixed(1));

          setLiveReviewsCount(combinedCount);
        } else {
          setLiveRating(baseRating);
          setLiveReviewsCount(baseCount);
        }
      } catch (error) {
        console.error(`Failed to fetch stats for ${destination.name}:`, error);
      }
    };

    getLiveStats();
  }, [destination]);

  return (
    <div
      onClick={() => navigate(`/destinations/${destination.id}`)}
      className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer border border-gray-100 dark:border-slate-800"
    >
      {/* Image */}
      <div
        className="h-48 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition z-10 shadow-md"
        >
          <Heart
            className={`w-6 h-6 transition ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-slate-200"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div>
          <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-50">
            {destination.name}
          </h3>

          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />

            <span className="ml-2 font-semibold">{liveRating}</span>

            <span className="text-gray-500 dark:text-slate-400 text-sm ml-2">
              ({liveReviewsCount})
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600 dark:text-slate-300 mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-600" />
              Best for: {destination.bestFor}
            </div>

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-600" />
              Best season: {destination.season}
            </div>

            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-600 dark:text-indigo-600" />
              Budget: {destination.cost}
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            navigate(`/destinations/${destination.id}`);
          }}
          className="mt-auto w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition dark:bg-indigo-600 dark:hover:bg-indigo-800"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
