import React from 'react';
import { MapPin, Star, Heart, Clock, TrendingUp, HeartOff } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { destinations } from '../utils/destinationsData';
import { Link } from 'react-router-dom';

export default function AddFavorite() {
    const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

    // Filter destinations to show only favorites
    const favoriteDestinations = destinations.filter(destination => 
        favoriteIds.includes(destination.id)
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        
                        <h1 className="text-5xl md:text-6xl font-bold">Favorite Destinations</h1>
                    </div>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                       Collect the destinations you love most, thoughtfully gathered to help you revisit and plan your travel.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {favoriteDestinations.length > 0 ? (
                    <>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Your Collection ({favoriteDestinations.length})
                            </h2>
                            <Link
                                to="/destinations"
                                className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-2"
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
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
            <div className={`${destination.image} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition" />
                <button
                    onClick={onToggleFavorite}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
                >
                    <Heart
                        className={`w-6 h-6 transition ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                    />
                </button>
            </div>

            <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{destination.name}</h3>

                <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2 font-semibold">{destination.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">({destination.reviews})</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                        Best for: {destination.bestFor}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-teal-600" />
                        Best season: {destination.season}
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-teal-600" />
                        Budget: {destination.cost}
                    </div>
                </div>

                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition">
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
                <div className="bg-gray-100 rounded-full p-8">
                    <HeartOff className="w-16 h-16 text-gray-400" />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No Favorites Yet
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                Explore our amazing destinations and start adding your favorites by clicking the heart icon!
            </p>
            <Link
                to="/destinations"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
            >
                Explore Destinations
            </Link>
        </div>
    );
}