import React from 'react';
import { Map, Compass, ShieldCheck, AlertTriangle, HelpCircle, ArrowRight, ChevronRight, ExternalLink, BookOpen, MessageCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HelpCenter() {
  const helpCards = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Getting Started",
      description: "Begin your journey with TourEase",
      link: "#getting-started",
      color: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-950/20"
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Using TourEase",
      description: "Master all features",
      link: "#using-tourease",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safety & Support",
      description: "Travel safely with confidence",
      link: "#safety-support",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Common Issues",
      description: "Quick troubleshooting",
      link: "#common-issues",
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20"
    }
  ];

  const quickLinks = [
    { icon: <BookOpen className="w-4 h-4" />, text: "User Guide", link: "/guide" },
    { icon: <MessageCircle className="w-4 h-4" />, text: "Live Chat", link: "/chat" },
    { icon: <Zap className="w-4 h-4" />, text: "Video Tutorials", link: "/tutorials" },
    { icon: <ExternalLink className="w-4 h-4" />, text: "Community Forum", link: "/community" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header - Keeping it exactly the same */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-16 md:py-20 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">Help Center</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-md">
            Quick answers and guidance for getting the most out of TourEase.
          </p>
        </div>
      </div>

      {/* Main Content - Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Help Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpCards.map((card, index) => (
            <Link 
              key={index}
              to={card.link}
              className={`${card.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{card.description}</p>
              <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium text-sm">
                Learn more
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:border-teal-200 dark:hover:border-teal-800 border border-transparent transition-all group"
              >
                <div className="text-teal-600 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Help Sections - Enhanced */}
        <div className="space-y-8">
          {/* 1️⃣ Getting Started */}
          <Section icon={<Compass className="w-6 h-6 text-teal-600" />} title="Getting Started" id="getting-started">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                TourEase helps you plan, organize, and enjoy your travels with ease. Here's how to begin your journey:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm font-bold">1</div>
                    <span className="font-semibold text-gray-900 dark:text-white">Account Setup</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sign up or log in to begin your travel planning journey.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm font-bold">2</div>
                    <span className="font-semibold text-gray-900 dark:text-white">Plan Your Trip</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click <b>Plan Trip</b> to create or explore a new adventure.</p>
                </div>
              </div>
              <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900 rounded-xl p-4">
                <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">Pro Tip</h4>
                <p className="text-sm text-teal-700 dark:text-teal-400">
                  Use the <b>Map</b> feature to discover hidden gems and plan efficient routes between destinations.
                </p>
              </div>
            </div>
          </Section>

          {/* 2️⃣ Using TourEase */}
          <Section icon={<Map className="w-6 h-6 text-teal-600" />} title="Using TourEase" id="using-tourease">
            <div className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Navigate the dashboard to see your trips and personalized suggestions",
                  "Explore destinations using the interactive map with real-time updates",
                  "Save favorite places or trips for quick access later",
                  "Click on any trip to view details, events, and weather updates"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* 3️⃣ Safety & Support */}
          <Section icon={<ShieldCheck className="w-6 h-6 text-teal-600" />} title="Safety & Support" id="safety-support">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Emergency Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">Find nearby hospitals, police, and embassies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">One-tap emergency contact feature</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Travel Smart</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">Report issues directly in the app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">Keep your information secure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* 4️⃣ Common Issues */}
          <Section icon={<AlertTriangle className="w-6 h-6 text-teal-600" />} title="Common Issues" id="common-issues">
            <div className="space-y-4">
              {[
                {
                  problem: "Location not working?",
                  solution: "Make sure location is enabled and allowed for your browser/app.",
                  icon: "📍"
                },
                {
                  problem: "Map not loading?",
                  solution: "Refresh the page and check your internet connection.",
                  icon: "🗺️"
                },
                {
                  problem: "Page not responding?",
                  solution: "Try reloading or clearing your browser cache.",
                  icon: "🔄"
                }
              ].map((issue, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                  <div className="text-2xl">{issue.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{issue.problem}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{issue.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 5️⃣ Need More Help? */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-2xl border border-teal-200 dark:border-purple-800 p-8 text-center">
            <HelpCircle className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Still Need Help?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/faq" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-teal-200 dark:border-teal-800"
              >
                Browse FAQ
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children, id }) {
  return (
    <section 
      id={id}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="pl-1">{children}</div>
    </section>
  );
}