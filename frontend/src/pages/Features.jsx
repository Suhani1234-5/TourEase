import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Shield,
  Mic,
  Hotel,
  Coffee,
  Clock,
  Headphones,
  Briefcase,
  AlertTriangle,
  Star,
  DollarSign,
  Landmark,
  Car,
  Calendar,
  CloudSun
} from 'lucide-react';

export default function Features() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white dark:text-white">
            Powerful Features for Smart Travel
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl text-white dark:text-gray-100">
            Everything you need to plan, explore, and experience destinations seamlessly — all powered by AI.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Explore All <span className="text-teal-600 dark:text-indigo-400">TourEase</span> Features
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
          From AI-powered trip planning to 24/7 support, we've got everything to make your travel experience unforgettable
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin className="w-10 h-10" />}
            title="AI Travel Planner"
            description="Generate custom travel itineraries based on destination, duration, budget, and interests. Interactive map-based route visualization with smart destination sequencing."
            color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
            highlights={[
              "Custom itineraries",
              "Budget optimization",
              "Smart route planning",
              "Entry fees included"
            ]}
          />

          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="Local Safety & Support"
            description="Real-time display of nearest hospitals, police stations, embassies, and authorities. Live safety alerts for weather warnings, protests, and local hazards."
            color="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"
            highlights={[
              "Emergency contacts",
              "Live safety alerts",
              "Nearby authorities",
              "One-tap assistance"
            ]}
          />

          <FeatureCard
            icon={<Mic className="w-10 h-10" />}
            title="AI Voice Translator & Assistant"
            description="Real-time voice translation between your language and local language. Voice-activated queries for recommendations and directions with offline mode."
            color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
            highlights={[
              "100+ languages",
              "Voice commands",
              "Offline mode",
              "Real-time translation"
            ]}
          />

          <FeatureCard
            icon={<Hotel className="w-10 h-10" />}
            title="Smart Hotel & Stay Finder"
            description="Map integration showing hotels, hostels, and homestays with real-time prices, ratings, distance, and availability. Advanced filtering by budget and amenities."
            color="bg-teal-100 text-teal-600 dark:bg-indigo-950 dark:text-indigo-300"
            highlights={[
              "Real-time availability",
              "Price comparison",
              "Rating filters",
              "Map integration"
            ]}
          />

          <FeatureCard
            icon={<Coffee className="w-10 h-10" />}
            title="Local Experience Discovery"
            description="Curated lists of local cafés, restaurants, and food stalls. Discover hidden gems, small businesses, and side activities like kayaking, cooking classes, and trekking."
            color="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
            highlights={[
              "Hidden gems",
              "Local cuisine",
              "Side activities",
              "Authentic experiences"
            ]}
          />

          <FeatureCard
            icon={<Clock className="w-10 h-10" />}
            title="Personalized Trip Timetable"
            description="Auto-generated daily planner with timings, transport routes, and breaks. Fully customizable schedule management to fit your travel style."
            color="bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
            highlights={[
              "Auto-generated plans",
              "Transport routes",
              "Customizable schedule",
              "Break optimization"
            ]}
          />

          <FeatureCard
            icon={<Headphones className="w-10 h-10" />}
            title="24/7 Live Support"
            description="Round-the-clock chat and call support with AI-powered trip logging for immediate assistance. Optional real-time tracking (opt-in) for enhanced safety."
            color="bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
            highlights={[
              "24/7 availability",
              "AI assistance",
              "Real-time tracking",
              "Instant help"
            ]}
          />

          <FeatureCard
            icon={<Briefcase className="w-10 h-10" />}
            title="Travel Locker & Query Management"
            description="Digital record of important belongings and documents. AI/human tour guide chat for FAQs and trip updates to keep you organized."
            color="bg-cyan-100 text-cyan-600 dark:bg-indigo-950 dark:text-indigo-300"
            highlights={[
              "Document storage",
              "Belongings tracker",
              "AI tour guide",
              "FAQ assistance"
            ]}
          />

          <FeatureCard
            icon={<AlertTriangle className="w-10 h-10" />}
            title="Issue Reporting System"
            description="Report lost items, fraud, or unsafe areas directly through the app. Share incidents with local help desk or authorities for quick resolution."
            color="bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
            highlights={[
              "Lost item reports",
              "Fraud alerts",
              "Unsafe area warnings",
              "Authority integration"
            ]}
          />

          <FeatureCard
            icon={<Star className="w-10 h-10" />}
            title="Review & Community System"
            description="Leave reviews, post trip photos, and rate places. Instagram-like community feed for sharing travel moments and discovering authentic experiences."
            color="bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
            highlights={[
              "Photo sharing",
              "Place reviews",
              "Community feed",
              "Travel inspiration"
            ]}
          />

          <FeatureCard
            icon={<DollarSign className="w-10 h-10" />}
            title="Split & Expense Tracker"
            description="SPLIT system for group bill management with real-time expense summary. Export your spending data as PDF or CSV for easy record-keeping."
            color="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
            highlights={[
              "Group bill splitting",
              "Expense tracking",
              "PDF/CSV export",
              "Real-time summary"
            ]}
          />

          <FeatureCard
            icon={<Landmark className="w-10 h-10" />}
            title="Cultural & Historical Insights"
            description="Storytelling blurbs and audio snippets about locations. Learn about historical background, legends, myths, and local customs as you explore."
            color="bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300"
            highlights={[
              "Audio guides",
              "Historical context",
              "Local legends",
              "Cultural customs"
            ]}
          />

          <FeatureCard
            icon={<Car className="w-10 h-10" />}
            title="Transportation Assistance"
            description="Reserved taxi services and private driver options. Public transport info integration with real-time fare estimation and ride tracking."
            color="bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300"
            highlights={[
              "Taxi booking",
              "Public transport",
              "Fare estimation",
              "Ride tracking"
            ]}
          />

          <FeatureCard
            icon={<Calendar className="w-10 h-10" />}
            title="Event-Aware Recommendations"
            description="Discover destinations based on music festivals, sports tournaments, and cultural fairs. Dynamic updates via event calendar API integration."
            color="bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-950 dark:text-fuchsia-300"
            highlights={[
              "Festival calendar",
              "Sports events",
              "Cultural fairs",
              "Dynamic updates"
            ]}
          />

          <FeatureCard
            icon={<CloudSun className="w-10 h-10" />}
            title="Seasonal Experience Mapping"
            description="AI-powered recommendations for best visit times. Weather-based and seasonal attraction suggestions with local celebration highlights."
            color="bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
            highlights={[
              "Best visit times",
              "Weather insights",
              "Seasonal attractions",
              "Local celebrations"
            ]}
          />
        </div>
      </div>

      {/* Why Choose TourEase Section */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Why Choose TourEase?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
            We combine cutting-edge AI with real traveler insights to create the ultimate travel companion
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              number="01"
              title="All-in-One Platform"
              description="No need to juggle multiple apps. Everything from planning to booking to navigation is in one place."
            />
            <BenefitCard
              number="02"
              title="AI-Powered Intelligence"
              description="Our AI learns from millions of trips to give you personalized recommendations that actually match your style."
            />
            <BenefitCard
              number="03"
              title="Community-Driven"
              description="Real reviews and tips from fellow travelers who've been there, done that."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-10 opacity-90 text-white dark:text-gray-100">
            Join 50,000+ travelers who plan smarter with TourEase
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold transition text-lg"
            >
              Start Your Journey
            </Link>
            <Link
              to="/about"
              className="bg-white dark:bg-gray-900 text-teal-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-10 py-4 rounded-lg font-semibold transition text-lg border border-transparent dark:border-gray-800"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, color, highlights }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-indigo-700 group">
      <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{description}</p>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="text-sm text-teal-600 dark:text-indigo-400 flex items-center">
            <span className="w-1.5 h-1.5 bg-teal-600 dark:bg-indigo-400 rounded-full mr-2"></span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BenefitCard({ number, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all border border-transparent dark:border-gray-800">
      <div className="text-teal-600 dark:text-indigo-400 text-5xl font-bold mb-4 opacity-20">{number}</div>
      <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
