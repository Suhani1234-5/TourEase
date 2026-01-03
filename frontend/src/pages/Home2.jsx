import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, Users, Sparkles } from 'lucide-react';

export default function Home2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if redirected from signup
    if (location.state?.signupSuccess) {
      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }

    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-2xl border border-green-200 dark:border-green-900 p-6 max-w-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Welcome to TourEase! 🎉
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Your account has been created successfully. Start planning your next adventure!
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-sm text-teal-600 dark:text-indigo-400 hover:text-teal-700 dark:hover:text-indigo-300 font-medium transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-block bg-teal-100 dark:bg-indigo-950 text-teal-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Welcome {user?.name || 'Traveler'}!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Journey?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Your travel planning adventure begins now. Let's create your first itinerary and explore the world together.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <ActionCard
            icon={<MapPin className="w-8 h-8" />}
            title="Plan Your Trip"
            description="Create a personalized itinerary for your next destination"
            color="from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600"
            onClick={() => navigate('/destinations')}
          />
          <ActionCard
            icon={<Calendar className="w-8 h-8" />}
            title="View Itineraries"
            description="Browse and manage your saved travel plans"
            color="from-orange-500 to-red-600 dark:from-orange-600 dark:to-rose-600"
            onClick={() => navigate('/destinations')}
          />
          <ActionCard
            icon={<Users className="w-8 h-8" />}
            title="Join Community"
            description="Connect with fellow travelers and share experiences"
            color="from-purple-500 to-pink-600 dark:from-purple-600 dark:to-fuchsia-600"
            onClick={() => navigate('/about')}
          />
        </div>

        {/* Getting Started Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-2xl p-8 md:p-12 mb-16 border border-transparent dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Getting Started
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-indigo-950 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 dark:text-indigo-300 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Explore Destinations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Browse through our curated list of amazing destinations around the world.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-indigo-950 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 dark:text-indigo-300 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Create Your Itinerary
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Use our AI-powered planner to create a personalized travel plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-indigo-950 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 dark:text-indigo-300 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Book Accommodations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Find and book the perfect stay for your trip with our smart recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-indigo-950 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 dark:text-indigo-300 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Start Traveling
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Access your plans offline and enjoy 24/7 support during your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => navigate('/destinations')}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white px-10 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Planning Your First Trip
          </button>
        </div>
      </div>

      {/* Add custom animation */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function ActionCard({ icon, title, description, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all p-6 cursor-pointer transform hover:scale-105 border border-gray-100 dark:border-gray-800"
    >
      <div className={`bg-gradient-to-r ${color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
