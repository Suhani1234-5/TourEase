import React from 'react';
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Heart, Clock, TrendingUp } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { destinations } from '../utils/destinationsData';

export default function Destinations() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ...same hero/filter... */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isFavorite={isFavorite(destination.id)}
              onToggleFavorite={() => toggleFavorite(destination.id)}
              onOpen={() => navigate(`/destinations/${destination.id}`)}
            />
          ))}
        </div>
      </div>

      {/* ...same CTA... */}
    </div>
  );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer border border-transparent dark:border-gray-800"
    >
      <div
        className="h-48 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 dark:opacity-40 dark:group-hover:opacity-50 transition" />

        {/* IMPORTANT: fav click par page open na ho, so stopPropagation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition z-10"
        >
          <Heart
            className={`w-6 h-6 transition ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
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
          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{destination.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({destination.reviews})</span>
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
            onOpen();
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
