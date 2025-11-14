import React from 'react';
import { Globe, Shield, Smartphone, Video, Calendar, Headphones, Users, MapPin, Clock, DollarSign, Award, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Explore the World!
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Smart Travel<br />Assistant Awaits
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl opacity-90">
            Plan smarter, travel better! Whether you're exploring nearby or venturing abroad,
            our intelligent assistant has everything covered — from itineraries to bookings,
            all in one place.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
              Start Your Journey
            </button>
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-semibold transition text-lg">
              Explore Features
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-base opacity-80">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-base opacity-80">Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-base opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Everything You Need to Travel<br />Smart
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
          Your all-in-one travel companion powered by smart features designed to simplify every step of your journey
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Cards */}
          <FeatureCard
            icon={<Globe className="w-10 h-10" />}
            title="AI Travel Planner"
            description="Smart itinerary builder tailored to your interests, budget, and time. Get personalized recommendations instantly."
            color="bg-blue-100 text-blue-600"
          />

          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="Local Advice & Support"
            description="Get real-time tips from locals and travelers. Know what to do, where to go, and what to avoid."
            color="bg-teal-100 text-teal-600"
          />

          <FeatureCard
            icon={<Smartphone className="w-10 h-10" />}
            title="Smart Accommodation"
            description="Find the perfect stay with AI-driven suggestions based on reviews, location, and price."
            color="bg-purple-100 text-purple-600"
          />

          <FeatureCard
            icon={<Video className="w-10 h-10" />}
            title="Online Translation"
            description="Break language barriers with instant AI-powered translation for over 100 languages."
            color="bg-green-100 text-green-600"
          />

          <FeatureCard
            icon={<Calendar className="w-10 h-10" />}
            title="Offline Accessibility"
            description="Access your itinerary, maps & guides without internet. Travel worry-free anywhere."
            color="bg-orange-100 text-orange-600"
          />

          <FeatureCard
            icon={<Headphones className="w-10 h-10" />}
            title="24/7 Live Support"
            description="Get instant help anytime, anywhere. Our travel experts are always ready to assist you."
            color="bg-pink-100 text-pink-600"
          />

          <FeatureCard
            icon={<Users className="w-10 h-10" />}
            title="Group Trip Planner"
            description="Coordinate with friends easily. Share itineraries, split costs, and vote on activities."
            color="bg-indigo-100 text-indigo-600"
          />

          <FeatureCard
            icon={<DollarSign className="w-10 h-10" />}
            title="Budget Tracker"
            description="Stay on budget with smart expense tracking and cost predictions for your entire trip."
            color="bg-yellow-100 text-yellow-600"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How <span className="text-teal-600">TourEase</span> Works
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16">
            Four simple steps to planning your perfect trip with AI assistance
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              number="1"
              icon={<MapPin className="w-8 h-8" />}
              title="Tell Us Your Destination"
              description="Simply enter where you want to go and when. Our AI understands your preferences."
              color="bg-teal-500"
            />

            <StepCard
              number="2"
              icon={<Star className="w-8 h-8" />}
              title="Get Personalized Suggestions"
              description="Receive custom itineraries based on your interests, budget, and travel style."
              color="bg-orange-500"
            />

            <StepCard
              number="3"
              icon={<Clock className="w-8 h-8" />}
              title="Travel with Confidence"
              description="Access your plans offline, get real-time updates, and enjoy 24/7 support."
              color="bg-teal-500"
            />

            <StepCard
              number="4"
              icon={<Award className="w-8 h-8" />}
              title="Share Your Story"
              description="Document memories, share tips with community, and earn rewards for contributions."
              color="bg-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Join Our Global Travel <span className="text-teal-600">Community</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
          Connect with fellow travelers, share experiences, and get inspired for your next adventure
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <CommunityCard
            name="Emily Chen"
            location="New York, USA"
            quote="TourEase made planning my Europe trip so easy! The AI suggestions were spot-on, and I discovered hidden gems I never would have found."
            trips="23 Trips"
          />

          <CommunityCard
            name="Marco Rossi"
            location="Rome, Italy"
            quote="As a frequent traveler, this app has become essential. The offline features saved me countless times, and the community is incredibly helpful."
            trips="47 Trips"
          />

          <CommunityCard
            name="Priya Patel"
            location="Mumbai, India"
            quote="The budget tracker helped me travel more while spending less. I love how it suggests alternatives and helps optimize my expenses!"
            trips="15 Trips"
          />
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <Users className="w-20 h-20 mx-auto mb-6 opacity-80" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Join 50,000+ Travelers</h3>
              <p className="text-lg mb-6 opacity-90">Start your journey with the smartest travel assistant</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Ready to Explore the World?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Experience Travel<br />Like Never Before?
          </h2>

          <p className="text-xl mb-10 opacity-90">
            Join thousands of smart travelers who plan better and explore more with TourEase
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
              Get Started Free
            </button>
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-semibold transition text-lg">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">Free</div>
              <div className="text-base opacity-80">Forever Plan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">5 Min</div>
              <div className="text-base opacity-80">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9★</div>
              <div className="text-base opacity-80">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
              <div className="text-base opacity-80">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-2xl mb-4">TourEase</h3>
              <p className="text-sm leading-relaxed">Your smart travel companion for unforgettable adventures around the world.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 TourEase. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-teal-200 group">
      <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description, color }) {
  return (
    <div className="text-center">
      <div className={`${color} text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
        {number}
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all h-full">
        <div className="bg-teal-100 text-teal-600 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-5">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CommunityCard({ name, location, quote, trips }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-6 italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center text-sm text-teal-600 font-semibold">
        <MapPin className="w-5 h-5 mr-2" />
        {trips}
      </div>
    </div>
  );
}