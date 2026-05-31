import React, { useState } from 'react';
import { Compass, Coffee, Heart, Landmark, Calendar, MapPin, Clock, ArrowRight, Music, Utensils, Trees, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '../utils/destinationsData';

const MOODS = [
  {
    id: 'adventure',
    name: 'Adventure & Thrill',
    icon: <Compass className="w-8 h-8" />,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300',
    description: 'Action-packed, high energy, and outdoors.',
    recommendedIds: [9, 10, 11],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & High-Octane Start',
        activities: [
          { time: '09:00 AM', desc: 'Arrive and check into basecamp hotel.', icon: <MapPin className="w-4 h-4"/> },
          { time: '11:00 AM', desc: 'Off-road ATV jungle tour.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Zip-lining across the valley.', icon: <Clock className="w-4 h-4"/> },
          { time: '07:00 PM', desc: 'Local street food & campfire dinner.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Mountain Expedition',
        activities: [
          { time: '06:00 AM', desc: 'Early morning hike to the summit.', icon: <Clock className="w-4 h-4"/> },
          { time: '12:00 PM', desc: 'Picnic lunch at the peak.', icon: <Clock className="w-4 h-4"/> },
          { time: '02:00 PM', desc: 'Rock climbing session.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Rest & hearty dinner at a mountain lodge.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Water Sports & Departure',
        activities: [
          { time: '09:00 AM', desc: 'White-water river rafting.', icon: <Clock className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Farewell lunch by the river.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Pack up and head to the airport.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'relax',
    name: 'Relax & Unwind',
    icon: <Coffee className="w-8 h-8" />,
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300',
    description: 'Spa days, beaches, and slow mornings.',
    recommendedIds: [4, 13, 14],
    itinerary: [
      {
        day: 1,
        title: 'Settle In & Detox',
        activities: [
          { time: '11:00 AM', desc: 'Check into the spa resort.', icon: <MapPin className="w-4 h-4"/> },
          { time: '02:00 PM', desc: 'Welcome massage and thermal baths.', icon: <Clock className="w-4 h-4"/> },
          { time: '06:00 PM', desc: 'Sunset yoga session.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Light, healthy dinner at the resort.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Beachfront Bliss',
        activities: [
          { time: '09:00 AM', desc: 'Breakfast in bed.', icon: <Clock className="w-4 h-4"/> },
          { time: '11:00 AM', desc: 'Lounging by the private beach.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Seafood lunch by the shore.', icon: <Clock className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Guided meditation session.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Slow Morning & Departure',
        activities: [
          { time: '10:00 AM', desc: 'Leisurely morning walk in nature.', icon: <Clock className="w-4 h-4"/> },
          { time: '12:00 PM', desc: 'Final spa treatment.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Check out and depart.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'romantic',
    name: 'Romantic Getaway',
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300',
    description: 'Candlelit dinners, scenic views, and quality time.',
    recommendedIds: [1, 13, 14],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Sunset',
        activities: [
          { time: '02:00 PM', desc: 'Check into a boutique hotel.', icon: <MapPin className="w-4 h-4"/> },
          { time: '05:00 PM', desc: 'Private sunset sailing trip.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Candlelit dinner by the water.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Exploring Together',
        activities: [
          { time: '10:00 AM', desc: 'Couples cooking class.', icon: <Clock className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Lunch with wine tasting.', icon: <Clock className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Stroll through historic gardens.', icon: <MapPin className="w-4 h-4"/> },
          { time: '07:30 PM', desc: 'Dinner at a rooftop restaurant.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Sweet Farewells',
        activities: [
          { time: '09:00 AM', desc: 'Breakfast on a private balcony.', icon: <Clock className="w-4 h-4"/> },
          { time: '11:00 AM', desc: 'Souvenir shopping in local boutiques.', icon: <MapPin className="w-4 h-4"/> },
          { time: '02:00 PM', desc: 'Depart with wonderful memories.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'cultural',
    name: 'Cultural Immersion',
    icon: <Landmark className="w-8 h-8" />,
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300',
    description: 'Museums, history, and local traditions.',
    recommendedIds: [2, 7, 8],
    itinerary: [
      {
        day: 1,
        title: 'Historic Center',
        activities: [
          { time: '10:00 AM', desc: 'Guided walking tour of the old city.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Lunch at a traditional tavern.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Visit the National Museum.', icon: <Clock className="w-4 h-4"/> },
          { time: '07:00 PM', desc: 'Attend a local folklore show.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Art & Architecture',
        activities: [
          { time: '09:30 AM', desc: 'Explore ancient ruins or castle.', icon: <MapPin className="w-4 h-4"/> },
          { time: '12:30 PM', desc: 'Lunch at a historic market.', icon: <Clock className="w-4 h-4"/> },
          { time: '02:30 PM', desc: 'Visit the Modern Art Gallery.', icon: <Clock className="w-4 h-4"/> },
          { time: '06:00 PM', desc: 'Evening architecture walk.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Local Crafts & Departure',
        activities: [
          { time: '10:00 AM', desc: 'Artisan workshop (pottery or weaving).', icon: <Clock className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Final authentic lunch.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Transfer to the airport.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'party',
    name: 'Party & Nightlife',
    icon: <Music className="w-8 h-8" />,
    color: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-950 dark:text-fuchsia-300',
    description: 'Energetic, clubs, and late nights.',
    recommendedIds: [6, 5, 3],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Pre-Party',
        activities: [
          { time: '04:00 PM', desc: 'Check into your downtown hotel.', icon: <MapPin className="w-4 h-4"/> },
          { time: '07:00 PM', desc: 'Cocktails and tapas at a rooftop bar.', icon: <Clock className="w-4 h-4"/> },
          { time: '11:00 PM', desc: 'VIP entry to the top local nightclub.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 AM', desc: 'Late night street food run.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Recovery & Beach Club',
        activities: [
          { time: '12:00 PM', desc: 'Late brunch by the water.', icon: <Clock className="w-4 h-4"/> },
          { time: '02:00 PM', desc: 'Afternoon at an exclusive day club.', icon: <MapPin className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Dinner in the entertainment district.', icon: <Clock className="w-4 h-4"/> },
          { time: '10:30 PM', desc: 'Bar hopping and live music venues.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Chill & Departure',
        activities: [
          { time: '11:00 AM', desc: 'Relaxing spa morning to recover.', icon: <Clock className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Farewell lunch.', icon: <Clock className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Head to the airport.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'foodie',
    name: 'Foodie Explore',
    icon: <Utensils className="w-8 h-8" />,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300',
    description: 'Culinary, markets, and fine dining.',
    recommendedIds: [2, 1, 5],
    itinerary: [
      {
        day: 1,
        title: 'Market Tour & Street Food',
        activities: [
          { time: '10:00 AM', desc: 'Guided tour of the central food market.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Lunch at a famous street food stall.', icon: <Clock className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Coffee or tea tasting experience.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Authentic local dinner.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Cooking & Fine Dining',
        activities: [
          { time: '09:30 AM', desc: 'Traditional cooking class.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Enjoy the meal you just cooked.', icon: <Clock className="w-4 h-4"/> },
          { time: '05:00 PM', desc: 'Visit a local brewery or winery.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:30 PM', desc: 'Michelin-starred dining experience.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Sweet Treats & Departure',
        activities: [
          { time: '09:00 AM', desc: 'Breakfast at a famous local bakery.', icon: <Clock className="w-4 h-4"/> },
          { time: '11:00 AM', desc: 'Shopping for spices and local treats.', icon: <MapPin className="w-4 h-4"/> },
          { time: '02:00 PM', desc: 'Final late lunch before departure.', icon: <Clock className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'nature',
    name: 'Nature & Wildlife',
    icon: <Trees className="w-8 h-8" />,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300',
    description: 'Forests, parks, and serene landscapes.',
    recommendedIds: [10, 4, 9],
    itinerary: [
      {
        day: 1,
        title: 'Into the Wild',
        activities: [
          { time: '09:00 AM', desc: 'Arrive at the eco-lodge.', icon: <MapPin className="w-4 h-4"/> },
          { time: '11:00 AM', desc: 'Introductory guided forest walk.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Wildlife spotting by the lake.', icon: <Clock className="w-4 h-4"/> },
          { time: '07:00 PM', desc: 'Dinner under the stars.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Exploration Day',
        activities: [
          { time: '06:00 AM', desc: 'Early morning bird watching tour.', icon: <Clock className="w-4 h-4"/> },
          { time: '10:00 AM', desc: 'Hike to the hidden waterfalls.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Picnic lunch in nature.', icon: <Clock className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Canoeing or kayaking on the river.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Final Views & Departure',
        activities: [
          { time: '08:00 AM', desc: 'Sunrise photography session.', icon: <Clock className="w-4 h-4"/> },
          { time: '10:00 AM', desc: 'Visit a local conservation center.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'Depart back to the city.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury & Shopping',
    icon: <ShoppingBag className="w-8 h-8" />,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300',
    description: 'High-end resorts and designer stores.',
    recommendedIds: [6, 1, 8],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Style',
        activities: [
          { time: '02:00 PM', desc: 'Check into a 5-star hotel suite.', icon: <MapPin className="w-4 h-4"/> },
          { time: '04:00 PM', desc: 'Personal styling session.', icon: <Clock className="w-4 h-4"/> },
          { time: '07:30 PM', desc: 'Chauffeur to an exclusive restaurant.', icon: <Clock className="w-4 h-4"/> },
          { time: '10:00 PM', desc: 'Drinks at a members-only lounge.', icon: <Clock className="w-4 h-4"/> }
        ]
      },
      {
        day: 2,
        title: 'Designer Shopping Spree',
        activities: [
          { time: '10:00 AM', desc: 'Visit flagship designer boutiques.', icon: <MapPin className="w-4 h-4"/> },
          { time: '01:00 PM', desc: 'High tea at a luxury cafe.', icon: <Clock className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Spa and wellness treatments.', icon: <Clock className="w-4 h-4"/> },
          { time: '08:00 PM', desc: 'Private yacht or helicopter tour.', icon: <MapPin className="w-4 h-4"/> }
        ]
      },
      {
        day: 3,
        title: 'Leisure & Departure',
        activities: [
          { time: '10:00 AM', desc: 'Breakfast in bed.', icon: <Clock className="w-4 h-4"/> },
          { time: '12:00 PM', desc: 'Last minute duty-free shopping.', icon: <MapPin className="w-4 h-4"/> },
          { time: '03:00 PM', desc: 'Private transfer to the airport.', icon: <MapPin className="w-4 h-4"/> }
        ]
      }
    ]
  }
];

export default function MoodPlanner() {
  const [selectedMood, setSelectedMood] = useState(null);

  const activeMood = MOODS.find(m => m.id === selectedMood);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What's your travel mood?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select how you want to feel, and we'll build a perfect 3-day itinerary for you.
          </p>
        </div>

        {/* Mood Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {MOODS.map(mood => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 
                ${selectedMood === mood.id 
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-md transform -translate-y-2' 
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-teal-300 hover:shadow-sm'
                }`}
            >
              <div className={`${mood.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform ${selectedMood === mood.id ? 'scale-110' : ''}`}>
                {mood.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{mood.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{mood.description}</p>
            </button>
          ))}
        </div>

        {/* Itinerary Display */}
        {activeMood && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 animate-fadeIn transition-all duration-500">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <div className={`${activeMood.color} p-4 rounded-xl`}>
                {activeMood.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Your 3-Day {activeMood.name} Itinerary
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  A personalized plan curated for your current vibe.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {activeMood.itinerary.map((day) => (
                <div key={day.day} className="relative">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 font-bold px-3 py-1 rounded-lg text-sm">
                      Day {day.day}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                      {day.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-teal-500 z-10">
                            {act.icon}
                          </div>
                          {i !== day.activities.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                          )}
                        </div>
                        <div className="pb-4">
                          <span className="text-sm font-semibold text-teal-600 dark:text-teal-400 block mb-1">
                            {act.time}
                          </span>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center pt-8 border-t border-gray-100 dark:border-gray-800">
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Save Itinerary
              </button>
            </div>

            {/* Recommended Destinations */}
            {activeMood.recommendedIds && activeMood.recommendedIds.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Perfect Destinations for this Mood
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {activeMood.recommendedIds.map(destId => {
                    const dest = destinations.find(d => d.id === destId);
                    if (!dest) return null;
                    return (
                      <Link 
                        key={dest.id} 
                        to={`/destinations/${dest.id}`}
                        className="group block rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <h4 className="absolute bottom-4 left-4 text-white font-bold text-lg">
                            {dest.name}
                          </h4>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Explore {dest.name}
                          </span>
                          <ArrowRight className="w-5 h-5 text-teal-500 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
