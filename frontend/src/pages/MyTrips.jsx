
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Trash2, ArrowRight, Plane, Plus, Sparkles, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

export default function MyTrips() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  
  // Custom Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await api.getUserItineraries();
      if (data.success) {
        setItineraries(data.itineraries || []);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (e, trip) => {
    e.stopPropagation(); // Avoid triggering card click
    setSelectedTrip(trip);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTrip(null);
  };

  const handleDeleteTrip = async () => {
    if (!selectedTrip) return;
    setIsDeleting(true);
    try {
      const response = await api.deleteItinerary(selectedTrip._id);
      if (response.success) {
        // Smoothly filter out deleted itinerary from local state
        setItineraries(prev => prev.filter(t => t._id !== selectedTrip._id));
        closeDeleteModal();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete itinerary: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDurationDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
    return `${diff} ${diff === 1 ? 'Day' : 'Days'}`;
  };

  // Grouping itineraries into Upcoming and Past
  const today = new Date().setHours(0, 0, 0, 0);

  const upcomingTrips = itineraries.filter(trip => {
    const tripStart = new Date(trip.startDate).setHours(0, 0, 0, 0);
    return tripStart >= today;
  });

  const pastTrips = itineraries.filter(trip => {
    const tripStart = new Date(trip.startDate).setHours(0, 0, 0, 0);
    return tripStart < today;
  });

  const displayedTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-xl -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                <span>My Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                My Trips & Plans
              </h1>
              <p className="text-lg opacity-90 max-w-2xl font-medium">
                Keep track of all your customized itineraries, review upcoming adventures, and access past journals.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/trip-planner')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              <Plus className="w-5 h-5" />
              Plan a New Trip
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-px mb-10">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-4 font-bold text-lg border-b-2 transition-all relative ${
                activeTab === 'upcoming'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Upcoming Trips
              {upcomingTrips.length > 0 && (
                <span className="ml-2 bg-teal-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {upcomingTrips.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 px-4 font-bold text-lg border-b-2 transition-all relative ${
                activeTab === 'past'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Past Journeys
              {pastTrips.length > 0 && (
                <span className="ml-2 bg-slate-400 dark:bg-slate-700 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {pastTrips.length}
                </span>
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-semibold">
            <Plane className="w-4 h-4 text-teal-500" />
            <span>Total Saved: {itineraries.length}</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-semibold dark:text-slate-400">Loading your itineraries...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center max-w-xl mx-auto my-12">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-red-900 dark:text-red-400 mb-2">Failed to Load Trips</h3>
            <p className="text-red-600 dark:text-red-300 text-sm mb-4">{error}</p>
            <button onClick={fetchTrips} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition">
              Try Again
            </button>
          </div>
        )}

        {/* Empty States */}
        {!loading && !error && displayedTrips.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              No {activeTab} trips found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming trips planned. Let's create your next dream journey together!"
                : "You haven't traveled with TourEase yet. Once you complete some trips, they will appear here as past journeys."}
            </p>
            <button
              onClick={() => navigate('/trip-planner')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-bold transition shadow-md shadow-teal-500/20"
            >
              Get Started Now
            </button>
          </div>
        )}

        {/* Trips Grid */}
        {!loading && !error && displayedTrips.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTrips.map((trip) => {
              // Extract budget class
              const isBudget = trip.budget === 'budget';
              const isLuxury = trip.budget === 'luxury';
              
              return (
                <div
                  key={trip._id}
                  onClick={() => navigate(`/itinerary/${trip._id}`)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 p-6 relative group cursor-pointer transition-all transform hover:-translate-y-1.5 duration-300"
                >
                  
                  {/* Delete Button top corner */}
                  <button
                    onClick={(e) => openDeleteModal(e, trip)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 p-2 rounded-xl transition duration-200 z-10"
                    title="Delete trip plan"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="pr-8">
                    {/* Destination Title */}
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-indigo-400 transition duration-200 leading-snug">
                        {trip.destination}
                      </h3>
                    </div>

                    {/* Dates / Duration */}
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-5 font-semibold">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-xs">
                        {getDurationDays(trip.startDate, trip.endDate)}
                      </span>
                    </div>

                    {/* Meta Stats Badges */}
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {/* Travelers badge */}
                      <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                        <Users className="w-3.5 h-3.5 text-teal-500" />
                        {trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </span>

                      {/* Budget Badge */}
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                        isLuxury 
                          ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50' 
                          : isBudget 
                          ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/50'
                          : 'bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/50'
                      }`}>
                        <DollarSign className="w-3.5 h-3.5" />
                        {trip.budget}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-1.5 text-teal-600 dark:text-indigo-400 font-extrabold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Open Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {deleteModalOpen && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition duration-300">
          {/* Modal Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in scale-in duration-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Trip Plan?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Are you sure you want to permanently delete your itinerary to <span className="font-extrabold text-slate-800 dark:text-slate-200">"{selectedTrip.destination}"</span>?
                </p>
              </div>
            </div>

            <p className="text-xs text-red-500 font-semibold mb-6">
              ⚠️ Warning: This action cannot be undone and will permanently remove this itinerary and all associated suggestion logs.
            </p>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTrip}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-5 py-2 font-bold rounded-xl text-sm transition flex items-center gap-1.5 shadow-md shadow-red-500/10"
              >
                {isDeleting ? 'Deleting...' : 'Delete Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Animations */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>

    </div>
  );
}
