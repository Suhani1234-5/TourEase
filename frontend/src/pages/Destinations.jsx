import React, { useState } from 'react';
import { MapPin, Star, Heart, Clock, Users, TrendingUp } from 'lucide-react';

export default function Destinations() {
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (id) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
        } else {
            newFavorites.add(id);
        }
        setFavorites(newFavorites);
    };

    const destinations = [
        {
            id: 1,
            name: 'Paris, France',
            image: 'bg-gradient-to-br from-blue-400 to-blue-600',
            rating: 4.9,
            reviews: 2450,
            bestFor: 'Romance, Culture',
            season: 'Spring & Fall',
            cost: '$$$'
        },
        {
            id: 2,
            name: 'Tokyo, Japan',
            image: 'bg-gradient-to-br from-pink-400 to-red-600',
            rating: 4.8,
            reviews: 1890,
            bestFor: 'Tech, Culture, Food',
            season: 'Spring & Autumn',
            cost: '$$$'
        },
        {
            id: 3,
            name: 'Barcelona, Spain',
            image: 'bg-gradient-to-br from-yellow-400 to-orange-600',
            rating: 4.7,
            reviews: 2100,
            bestFor: 'Art, Beach, Architecture',
            season: 'May-October',
            cost: '$$'
        },
        {
            id: 4,
            name: 'Bali, Indonesia',
            image: 'bg-gradient-to-br from-green-400 to-teal-600',
            rating: 4.8,
            reviews: 3200,
            bestFor: 'Beach, Spirituality, Budget',
            season: 'April-October',
            cost: '$'
        },
        {
            id: 5,
            name: 'New York, USA',
            image: 'bg-gradient-to-br from-red-400 to-purple-600',
            rating: 4.6,
            reviews: 3890,
            bestFor: 'City Life, Broadway, Food',
            season: 'Spring & Fall',
            cost: '$$$'
        },
        {
            id: 6,
            name: 'Dubai, UAE',
            image: 'bg-gradient-to-br from-amber-400 to-orange-600',
            rating: 4.7,
            reviews: 2670,
            bestFor: 'Luxury, Desert, Shopping',
            season: 'October-April',
            cost: '$$$'
        },
        {
            id: 7,
            name: 'Amsterdam, Netherlands',
            image: 'bg-gradient-to-br from-cyan-400 to-blue-600',
            rating: 4.8,
            reviews: 2340,
            bestFor: 'Cycling, Canals, Art',
            season: 'May-September',
            cost: '$$'
        },
        {
            id: 8,
            name: 'London, UK',
            image: 'bg-gradient-to-br from-indigo-400 to-purple-600',
            rating: 4.7,
            reviews: 3100,
            bestFor: 'History, Museums, Food',
            season: 'Summer',
            cost: '$$$'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore Destinations</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Discover amazing places around the world, carefully curated for every type of traveler.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap gap-4 mb-12">
                    <FilterButton label="All Destinations" active />
                    <FilterButton label="Budget Friendly" />
                    <FilterButton label="Luxury" />
                    <FilterButton label="Beach" />
                    <FilterButton label="Mountains" />
                    <FilterButton label="Cultural" />
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                            isFavorite={favorites.has(destination.id)}
                            onToggleFavorite={() => toggleFavorite(destination.id)}
                        />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Explore?
                    </h2>
                    <p className="text-xl mb-10 opacity-90">
                        Start planning your next adventure with TourEase
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                        Plan Your Trip
                    </button>
                </div>
            </div>
        </div>
    );
}

function FilterButton({ label, active }) {
    return (
        <button
            className={`px-6 py-2 rounded-full font-semibold transition ${active
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
        >
            {label}
        </button>
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
                        className={`w-6 h-6 transition ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
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
