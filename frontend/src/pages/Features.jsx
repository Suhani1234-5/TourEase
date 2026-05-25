import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
  CloudSun,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Features" },
  { id: "ai", label: "AI Features" },
  { id: "planning", label: "Travel Planning" },
  { id: "safety", label: "Safety & Support" },
  { id: "community", label: "Community" },
  { id: "budget", label: "Budget & Finance" },
  { id: "utilities", label: "Utilities" },
];

const features = [
  {
    title: "AI Travel Planner",
    description:
      "Generate custom travel itineraries based on destination, duration, budget, and interests. Intelligent route sequencing and time-aware recommendations.",
    icon: <MapPin className="w-10 h-10" />,
    color:
      "bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700 dark:from-slate-900 dark:to-slate-800 dark:text-sky-300",
    categories: ["ai", "planning"],
    size: "large",
    featured: true,
    highlights: [
      "Custom itinerary engine",
      "Time-aware routing",
      "Budget-aware travel plan",
      "AI-driven map insights",
    ],
  },
  {
    title: "Smart Hotel & Stay Finder",
    description:
      "Find ideal stays with real-time prices, ratings, distance, and availability. Smart filters help you choose the best option within minutes.",
    icon: <Hotel className="w-10 h-10" />,
    color:
      "bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-700 dark:from-slate-900 dark:to-slate-800 dark:text-teal-300",
    categories: ["planning", "utilities"],
    size: "large",
    featured: true,
    highlights: [
      "Live availability",
      "Instant price comparison",
      "Amenity filters",
      "Location intelligence",
    ],
  },
  {
    title: "AI Voice Translator & Assistant",
    description:
      "Speak naturally and get instant translation. Use voice commands to ask for directions, recommendations, and travel tips on the go.",
    icon: <Mic className="w-10 h-10" />,
    color:
      "bg-gradient-to-br from-purple-100 to-violet-100 text-purple-700 dark:from-slate-900 dark:to-slate-800 dark:text-purple-300",
    categories: ["ai", "utilities"],
    size: "large",
    featured: true,
    highlights: [
      "100+ languages",
      "Voice commands",
      "Offline translation",
      "Instant local help",
    ],
  },
  {
    title: "Personalized Travel Timeline",
    description:
      "Auto-generated daily travel agenda with transport routes, meal breaks, and sightseeing windows. Keeps your trip on schedule with smart flexibility.",
    icon: <Clock className="w-10 h-10" />,
    color:
      "bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-700 dark:from-slate-900 dark:to-slate-800 dark:text-indigo-300",
    categories: ["ai", "planning"],
    size: "large",
    featured: true,
    highlights: [
      "Dynamic daily planner",
      "Transport sync",
      "Rest optimization",
      "Flexible schedule control",
    ],
  },
  {
    title: "Local Safety & Support",
    description:
      "Get live safety alerts, nearest help points, and emergency guidance for locations you visit. Built for secure travel in every city.",
    icon: <Shield className="w-10 h-10" />,
    color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300",
    categories: ["safety", "utilities"],
    size: "medium",
    highlights: [
      "Emergency contacts",
      "Live alerts",
      "Nearby authorities",
      "Safety dashboard",
    ],
  },
  {
    title: "Local Experience Discovery",
    description:
      "Discover local cafés, eateries, and hidden gems. Smart suggestions based on your mood, schedule, and the weather.",
    icon: <Coffee className="w-10 h-10" />,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
    categories: ["planning", "community"],
    size: "medium",
    highlights: [
      "Food discoveries",
      "Local experiences",
      "Curated activities",
      "Authentic guides",
    ],
  },
  {
    title: "24/7 Live Support",
    description:
      "Live chat and call support at any time of day. AI-enhanced logs keep your agent updated on your itinerary and travel status.",
    icon: <Headphones className="w-10 h-10" />,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300",
    categories: ["safety", "community"],
    size: "medium",
    highlights: [
      "Anytime help",
      "AI status updates",
      "Quick response",
      "Travel assistance",
    ],
  },
  {
    title: "Review & Community System",
    description:
      "Share your travel stories and discover authentic experiences from other travelers in the TourEase community feed.",
    icon: <Star className="w-10 h-10" />,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
    categories: ["community"],
    size: "medium",
    highlights: [
      "Photo sharing",
      "Place reviews",
      "Community feed",
      "Inspiration stream",
    ],
  },
  {
    title: "Split & Expense Tracker",
    description:
      "Manage group expenses and track shared costs with automatic summaries and export-ready reports.",
    icon: <DollarSign className="w-10 h-10" />,
    color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300",
    categories: ["budget"],
    size: "medium",
    highlights: [
      "Group expenses",
      "Spending overview",
      "PDF/CSV export",
      "Real-time breakdown",
    ],
  },
  {
    title: "Travel Locker & Query Management",
    description:
      "Keep essential documents, tickets, and concierge requests organized in one secure travel locker.",
    icon: <Briefcase className="w-10 h-10" />,
    color: "bg-cyan-100 text-cyan-600 dark:bg-indigo-950 dark:text-indigo-300",
    categories: ["utilities"],
    size: "small",
    highlights: [
      "Document storage",
      "Belongings tracker",
      "AI FAQs",
      "Trip notes",
    ],
  },
  {
    title: "Issue Reporting System",
    description:
      "Report lost items, scams, or hazards instantly and escalate them to local help desks when needed.",
    icon: <AlertTriangle className="w-10 h-10" />,
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300",
    categories: ["safety"],
    size: "small",
    highlights: [
      "Incident reports",
      "Live alerts",
      "Hazard warnings",
      "Quick escalation",
    ],
  },
  {
    title: "Cultural & Historical Insights",
    description:
      "Get storytelling blurbs and audio snippets about the places you visit, with legends, history, and local customs.",
    icon: <Landmark className="w-10 h-10" />,
    color:
      "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
    categories: ["community"],
    size: "small",
    highlights: [
      "Audio stories",
      "Historical facts",
      "Local legends",
      "Culture tips",
    ],
  },
  {
    title: "Transportation Assistance",
    description:
      "Book taxis, compare fares, and track public transport in real time so your transfer plans stay on track.",
    icon: <Car className="w-10 h-10" />,
    color: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    categories: ["planning", "utilities"],
    size: "medium",
    highlights: [
      "Taxi booking",
      "Public transport",
      "Fare estimation",
      "Ride tracking",
    ],
  },
  {
    title: "Event-Aware Recommendations",
    description:
      "Discover events, festivals, and concerts happening near you with calendar-aware travel suggestions.",
    icon: <Calendar className="w-10 h-10" />,
    color:
      "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-950 dark:text-fuchsia-300",
    categories: ["planning", "community"],
    size: "medium",
    highlights: [
      "Festival alerts",
      "Sports events",
      "Cultural fairs",
      "Dynamic updates",
    ],
  },
  {
    title: "Seasonal Experience Mapping",
    description:
      "See the best destinations based on weather, festivals, and seasonal highlights for every month of the year.",
    icon: <CloudSun className="w-10 h-10" />,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
    categories: ["planning", "budget"],
    size: "medium",
    highlights: [
      "Weather insights",
      "Seasonal tips",
      "Festival calendar",
      "Local celebrations",
    ],
  },
];

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeatures = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return features.filter((feature) => {
      const categoryMatch =
        activeCategory === "all" || feature.categories.includes(activeCategory);
      const searchMatch =
        normalizedSearch === "" ||
        feature.title.toLowerCase().includes(normalizedSearch) ||
        feature.description.toLowerCase().includes(normalizedSearch);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    document
      .querySelectorAll(".feature-card-wrapper")
      .forEach((wrapper) => observer.observe(wrapper));

    return () => observer.disconnect();
  }, [filteredFeatures]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-600 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-950 text-white py-10">
        <div className="relative max-w-8xl mx-auto px-1 sm:px-3 lg:px-6 py-[-15] flex flex-col items-center text-center">
          <div className="max-w-6xl">
            <h1 className="mt-8 text-5xl md:text-6xl font-black font-semibold tracking-tight leading-tight">
              Explore TourEase with a modern Bento-style feature showcase
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`category-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-teal-600 text-white "
                    : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="w-full max-w-md">
            <label htmlFor="feature-search" className="sr-only">
              Search features
            </label>
            <div className="relative">
              <input
                id="feature-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search features..."
                className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 dark:text-slate-500">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 feature-grid">
          {filteredFeatures.length === 0 ? (
            <div className="col-span-12 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              No features match your search or selected category. Try a
              different keyword or select another category.
            </div>
          ) : (
            filteredFeatures.map((feature, index) => {
              const spanClass =
                feature.size === "large"
                  ? "lg:col-span-6"
                  : feature.size === "medium"
                    ? "lg:col-span-4"
                    : "lg:col-span-3";

              return (
                <div
                  key={feature.title}
                  className={`col-span-12 md:col-span-6 ${spanClass} feature-card-wrapper`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <FeatureCard {...feature} />
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-900 dark:text-slate-100">
            Why Choose TourEase?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 text-lg mb-12 max-w-3xl mx-auto">
            We combine cutting-edge AI with real traveler insights to create the
            ultimate travel companion.
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
      </section>

      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-600 dark:from-purple-900 dark:via-indigo-900 dark:to-slate-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join 50,000+ travelers who plan smarter with TourEase.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold transition text-lg shadow-lg shadow-orange-500/20"
            >
              Start Your Journey
            </Link>
            <Link
              to="/about"
              className="bg-white text-teal-600 hover:bg-slate-100 px-10 py-4 rounded-2xl font-semibold transition text-lg border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .category-pill {
          transition: all 0.28s ease;
        }
        .feature-card-wrapper {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .feature-card-wrapper.reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .feature-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          background: radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 24%), radial-gradient(circle at bottom right, rgba(236,72,153,0.12), transparent 20%);
        }
        .feature-card--featured::before {
          opacity: 1;
        }
        .feature-card:hover {
          transform: translateY(-6px) scale(1.01);
          z-index: 5;
        }
        .feature-card:hover::before {
          opacity: 1;
        }
        .feature-card-icon {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  highlights,
  featured,
}) {
  return (
    <div
      className={`feature-card rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950`}
    >
      <div
        className={`feature-card-icon ${color} w-16 h-16 rounded-3xl flex items-center justify-center mb-6 `}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-medium mb-4 text-slate-900 dark:text-white tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 leading-7 mb-6">
        {description}
      </p>
      <div className="grid gap-3">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 mt-1" />
            {highlight}
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitCard({ number, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl dark:shadow-black/20 border border-transparent dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="text-teal-600 dark:text-teal-300 text-5xl font-black mb-4 opacity-20">
        {number}
      </div>
      <h3 className="font-medium text-xl mb-3 text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
