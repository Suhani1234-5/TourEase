import React from "react";
import Testimonials from "../pages/Testimonials";
import { Link } from "react-router-dom";
import {
  Globe,
  Shield,
  Smartphone,
  Video,
  Calendar,
  Headphones,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Star,
} from "lucide-react";
import CountUp from "../components/CountUp";
import ChatbotLauncher from "../components/chatbot/ChatbotLauncher";


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen w-full bg-white dark:bg-[#030712] overflow-hidden flex items-center py-12 lg:py-0 font-sans">
        {/* Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-orange-500/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div className="space-y-6 text-left animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Explore the World!
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
                Your Smart Travel
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500">
                  Assistant Awaits
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed font-medium">
                Plan smarter, travel better! Whether you're exploring nearby or
                venturing abroad, our intelligent assistant has everything
                covered — from itineraries to bookings, all in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* CHANGED: Direct link to Trip Planner */}
                <Link
                  to="/trip-planner"
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-orange-900/20 active:scale-95 text-md flex items-center justify-center min-w-[180px]"
                >
                  Start Your Journey
                </Link>
                
                <Link 
                  to="/destinations" 
                  className="px-8 py-3.5 bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 rounded-xl font-bold transition-all duration-300 active:scale-95 text-md flex items-center justify-center min-w-[180px]"
                >
                  Explore Features
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    50K<span className="text-orange-500">+</span>
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                    Adventurers
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-gray-300 dark:bg-white/10"></div>
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    150<span className="text-teal-400">+</span>
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                    Destinations
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full flex justify-center lg:justify-end">
              <div className="relative z-20 animate-float-slow max-w-[420px] lg:max-w-[480px] w-full">
                <div className="rounded-[2.5rem] p-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
                  <div className="rounded-[2rem] overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                      alt="Luxury Tourism"
                      className="w-full h-[300px] md:h-[380px] lg:h-[480px] object-cover transition-transform duration-[3s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div className="absolute bottom-6 left-6 bg-white/70 dark:bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/40 dark:border-white/20 shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-teal-500">✦</span>
                        <p className="text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-wider">
                          Top Rated Experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        `}</style>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Everything You Need to Travel
          <br />
          Smart
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
          Your all-in-one travel companion powered by smart features designed to
          simplify every step of your journey
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* ================= HOW IT WORKS ================= */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            How{" "}
            <span className="text-teal-600 dark:text-teal-400">TourEase</span>{" "}
            Works
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-16">
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

      {/* ================= COMMUNITY ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Join Our Global Travel{" "}
          <span className="text-teal-600 dark:text-teal-400">Community</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
          Connect with fellow travelers, share experiences, and get inspired for
          your next adventure
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
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Join <CountUp/> Travelers
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Start your journey with the smartest travel assistant
              </p>
              {/* CHANGED: Direct link to Trip Planner */}
              <Link
                to="/trip-planner"
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg inline-block"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      {/* ================= CTA SECTION ================= */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Ready to Explore the World?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Experience Travel
            <br />
            Like Never Before?
          </h2>

          <p className="text-xl mb-10 opacity-90">
            Join thousands of smart travelers who plan better and explore more
            with TourEase
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {/* CHANGED: Direct link to Trip Planner */}
            <Link
              to="/trip-planner"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg"
            >
              Get Started Free
            </Link>
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
    {/* ================= CHATBOT ================= */}
      <ChatbotLauncher />
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-700 group">
      <div
        className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StepCard({ number, icon, title, description, color }) {
  return (
    <div className="text-center">
      <div
        className={`${color} text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}
      >
        {number}
      </div>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-gray-100 dark:border-gray-800">
        <div className="bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-5">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function CommunityCard({ name, location, quote, trips }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center text-sm text-teal-600 dark:text-teal-400 font-semibold">
        <MapPin className="w-5 h-5 mr-2" />
        {trips}
      </div>
    </div>
  );
}