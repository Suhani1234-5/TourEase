import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Award, Heart, Zap, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-cyan-900 text-white py-32">

        {/* Background Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <p className="uppercase tracking-[6px] text-cyan-300 font-semibold mb-4">
              Smart Travel Platform
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              Discover The World <br />
              With <span className="text-cyan-400">TourEase</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              Plan smarter journeys with AI-powered travel recommendations,
              personalized itineraries, and immersive travel experiences designed
              for modern explorers.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5">

              <Link
                to="/destinations"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Explore Destinations
              </Link>

              <Link
                to="/about"
                className="border border-gray-400 hover:border-cyan-400 hover:text-cyan-300 px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side About Image */}
          <div className="relative">

            {/* Main Image */}
            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60"
                alt="Travel Planning"
                className="h-[500px] w-full object-cover hover:scale-105 transition duration-700"
              />

            </div>

            {/* Floating Info Card */}
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800 max-w-sm">

              <div className="flex items-start gap-4">

                <div className="bg-cyan-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  🌍
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Smart Travel Planning
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    TourEase helps travelers discover destinations, plan itineraries,
                    manage budgets, and explore experiences effortlessly with AI-powered assistance.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Mission Section */}
      <div className="relative py-28 bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Left Side */}
            <div>

              <p className="uppercase tracking-[6px] text-cyan-500 font-bold mb-4">
                Our Mission
              </p>

              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8">
                Making Travel <br />
                <span className="text-cyan-500">
                  Smarter & More Beautiful
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                TourEase was created to simplify modern travel planning through
                intelligent recommendations, seamless experiences, and AI-powered personalization.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                We help travelers discover destinations, build smart itineraries,
                and experience journeys in a more immersive and stress-free way.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-10">

                <div>
                  <h3 className="text-4xl font-extrabold text-cyan-500">
                    50K+
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Happy Travelers
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-extrabold text-cyan-500">
                    150+
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Destinations
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-extrabold text-cyan-500">
                    4.9★
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    User Rating
                  </p>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                alt="Travel"
                className="rounded-3xl shadow-2xl h-[500px] w-full object-cover"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800">

                <div className="flex items-center gap-4">

                  <div className="bg-cyan-500 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    ✈️
                  </div>

                  <div>

                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      AI Powered Trips
                    </h4>

                    <p className="text-gray-500 dark:text-gray-400">
                      Personalized travel experiences
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-28 bg-gradient-to-b from-cyan-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">

        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 opacity-10 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div className="text-center mb-20">

            <p className="uppercase tracking-[6px] text-cyan-500 font-bold mb-4">
              Why Choose Us
            </p>

            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our Core Values
            </h2>

            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We combine technology, creativity, and traveler-first thinking
              to deliver a smarter and more immersive travel experience.
            </p>

          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">

            <ValueCard
              icon={<Heart className="w-12 h-12" />}
              title="Traveler-First"
              description="Every decision we make focuses on creating unforgettable travel experiences."
              color="bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
            />

            <ValueCard
              icon={<Target className="w-12 h-12" />}
              title="Simplicity"
              description="Clean, intuitive, and stress-free planning for modern travelers."
              color="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
            />

            <ValueCard
              icon={<Zap className="w-12 h-12" />}
              title="Innovation"
              description="Using AI and modern technology to transform travel planning."
              color="bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
            />

            <ValueCard
              icon={<Users className="w-12 h-12" />}
              title="Community"
              description="Building a global community of explorers and adventure seekers."
              color="bg-blue-100 text-blue-600 dark:bg-indigo-950 dark:text-indigo-300"
            />

            <ValueCard
              icon={<Award className="w-12 h-12" />}
              title="Excellence"
              description="Delivering premium quality experiences with attention to every detail."
              color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
            />

            <ValueCard
              icon={<Globe className="w-12 h-12" />}
              title="Accessibility"
              description="Making intelligent travel planning available for everyone worldwide."
              color="bg-teal-100 text-teal-600 dark:bg-indigo-950 dark:text-indigo-300"
            />

          </div>
        </div>
      </div>

    </div>
  );
}

function ValueCard({ icon, title, description, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm dark:shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2">

      <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center mb-5`}>
        {icon}
      </div>

      <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>

    </div>
  );
}