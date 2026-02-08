import React, { useState } from 'react';

const TourEaseWatchDemo = () => {
    const [activeFeature, setActiveFeature] = useState('itinerary');
    const [powerOn, setPowerOn] = useState(true);
    const [watchFace, setWatchFace] = useState('home');

    // Feature data
    const features = {
        itinerary: {
            title: "Dynamic Itinerary Adjustment",
            description: "Real-time adjustments based on events, weather, and disruptions.",
            icon: "🔄",
            details: [
                "Real-Time Event Detection",
                "Weather Monitoring with 5-day forecasts",
                "Disruption Alerts for closures & strikes",
                "AI-Powered Suggestions",
                "Full User Control over all suggestions",
                "Event-Enhanced Days with visual indicators"
            ]
        },
        ai: {
            title: "AI & Smart Planning",
            description: "Intelligent travel planning with voice assistance.",
            icon: "🤖",
            details: [
                "AI Travel Planner for custom itineraries",
                "AI Voice Assistant with real-time translation",
                "Seasonal Mapping for best times to visit",
                "Event-Aware integration with global APIs"
            ]
        },
        safety: {
            title: "Safety & Support",
            description: "Real-time safety features and emergency support.",
            icon: "🛡️",
            details: [
                "Local Safety: Nearest hospitals, police, embassies",
                "Emergency System: One-tap contact to authorities",
                "24/7 Support with AI-powered trip logging",
                "Issue Reporting for fraud, lost items, unsafe areas"
            ]
        },
        tools: {
            title: "Travel Tools & Community",
            description: "Essential travel tools and community features.",
            icon: "🎒",
            details: [
                "Smart Finder for hotels and hidden gems",
                "Travel Locker for digital documents",
                "Split & Expense management with PDF/CSV export",
                "Community Feed for reviews and travel moments"
            ]
        }
    };

    // Watch face content
    const watchFaces = {
        home: {
            time: "14:30",
            date: "Mon, Jun 10",
            location: "Paris, France",
            temp: "22°C",
            battery: 78,
            notifications: 3
        },
        itinerary: {
            time: "14:30",
            event: "Eiffel Tower Tour",
            next: "Louvre Museum - 16:00",
            status: "On Schedule",
            weather: "Sunny"
        },
        safety: {
            time: "14:30",
            status: "Area: Safe",
            nearest: "Hospital: 1.2km",
            emergency: "On Standby"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
            <header className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-6 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-aqua to-orange-500 flex items-center justify-center mr-4">
                            <span className="text-2xl">✈️</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-aqua to-orange-500 bg-clip-text text-transparent">
                                TourEase
                            </h1>
                            <p className="text-gray-400">Intelligent Travel Assistant</p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => setPowerOn(!powerOn)}
                            className={`px-4 py-2 rounded-full font-medium ${powerOn ? 'bg-gradient-to-r from-aqua to-teal-500 text-gray-900' : 'bg-gray-800 text-gray-400'}`}
                        >
                            {powerOn ? 'ONLINE' : 'OFFLINE'}
                        </button>

                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">TourEase Watch Demo</h2>

                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 mt-5">
                    {/* Watch Display */}
                    <div className="lg:w-2/5 flex flex-col items-center">
                        <div className="relative mb-4">
                            {/* Watch body */}
                            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-[3rem] border-8 border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl overflow-hidden">
                                {/* Watch screen */}
                                <div className={`absolute inset-2 rounded-[2.5rem] overflow-hidden transition-all duration-500 ${powerOn ? 'opacity-100' : 'opacity-30'}`}>
                                    {/* Screen background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950">
                                        {/* Screen content based on active watch face */}
                                        {powerOn ? (
                                            <div className="p-6 h-full flex flex-col">
                                                {watchFace === 'home' && (
                                                    <>
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <div className="text-4xl font-bold">{watchFaces.home.time}</div>
                                                                <div className="text-gray-400">{watchFaces.home.date}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-xl font-bold">{watchFaces.home.location}</div>
                                                                <div className="text-aqua">{watchFaces.home.temp}</div>
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 flex flex-col justify-center items-center">
                                                            <div className="text-6xl mb-4">✈️</div>
                                                            <div className="text-xl font-bold mb-2">TourEase Active</div>
                                                            <div className="text-gray-400 text-center">Swipe for itinerary, safety info, and tools</div>
                                                        </div>

                                                        <div className="flex justify-between items-center mt-6">
                                                            <div className="flex items-center">
                                                                <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-aqua to-teal-500"
                                                                        style={{ width: `${watchFaces.home.battery}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="ml-2 text-sm">{watchFaces.home.battery}%</span>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                                                                    <span className="text-sm font-bold">{watchFaces.home.notifications}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                {watchFace === 'itinerary' && (
                                                    <>
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div className="text-3xl font-bold">Itinerary</div>
                                                            <div className="text-aqua">{watchFaces.itinerary.time}</div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="bg-gradient-to-r from-aqua/20 to-teal-500/20 rounded-2xl p-4 mb-4">
                                                                <div className="text-gray-400 text-sm">Current</div>
                                                                <div className="text-xl font-bold">{watchFaces.itinerary.event}</div>
                                                            </div>

                                                            <div className="bg-gray-800/50 rounded-2xl p-4 mb-4">
                                                                <div className="text-gray-400 text-sm">Next</div>
                                                                <div className="text-lg font-medium">{watchFaces.itinerary.next}</div>
                                                            </div>

                                                            <div className="flex justify-between mt-6">
                                                                <div className="text-center">
                                                                    <div className="text-gray-400 text-sm">Status</div>
                                                                    <div className="text-green-400 font-bold">{watchFaces.itinerary.status}</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-gray-400 text-sm">Weather</div>
                                                                    <div className="text-aqua font-bold">{watchFaces.itinerary.weather}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex justify-center">
                                                            <div className="text-sm text-gray-400">Swipe left for safety info</div>
                                                        </div>
                                                    </>
                                                )}

                                                {watchFace === 'safety' && (
                                                    <>
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div className="text-3xl font-bold">Safety</div>
                                                            <div className="text-aqua">{watchFaces.safety.time}</div>
                                                        </div>

                                                        <div className="flex-1 flex flex-col justify-center">
                                                            <div className="text-center mb-8">
                                                                <div className="text-6xl mb-4">🛡️</div>
                                                                <div className="text-2xl font-bold text-green-400">{watchFaces.safety.status}</div>
                                                            </div>

                                                            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl p-4 mb-4">
                                                                <div className="text-gray-400 text-sm">Nearest Hospital</div>
                                                                <div className="text-xl font-bold">{watchFaces.safety.nearest}</div>
                                                            </div>

                                                            <div className="bg-gray-800/50 rounded-2xl p-4">
                                                                <div className="text-gray-400 text-sm">Emergency System</div>
                                                                <div className="text-lg font-medium">{watchFaces.safety.emergency}</div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex justify-center">
                                                            <div className="text-sm text-gray-400">Tap for emergency alert</div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center">
                                                <div className="text-6xl mb-4">⏻</div>
                                                <div className="text-2xl font-bold">TourEase Offline</div>
                                                <div className="text-gray-500 mt-2">Press power button to start</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Watch bezel highlight */}
                                    <div className="absolute inset-0 rounded-[2.5rem] border-2 border-gray-700/50 pointer-events-none"></div>
                                </div>

                                {/* Watch crown */}
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-10 h-16 rounded-r-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"></div>

                                {/* Watch buttons */}
                                <div className="absolute left-0 top-1/3 transform -translate-x-1 w-8 h-10 rounded-l-lg bg-gradient-to-l from-gray-800 to-gray-900 border border-gray-700"></div>
                                <div className="absolute left-0 top-2/3 transform -translate-x-1 w-8 h-10 rounded-l-lg bg-gradient-to-l from-gray-800 to-gray-900 border border-gray-700"></div>
                            </div>

                            {/* Watch strap connectors */}
                            <div className="absolute -top-4 left-8 right-8 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-lg"></div>
                            <div className="absolute -bottom-4 left-8 right-8 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-b-lg"></div>

                            {/* Watch strap top */}
                            <div className="absolute -top-20 left-10 right-10 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-lg"></div>

                            {/* Watch strap bottom */}
                            <div className="absolute -bottom-20 left-10 right-10 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-b-lg"></div>
                        </div>

                        {/* Watch controls */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setWatchFace('home')}
                                className={`px-4 py-2 rounded-full ${watchFace === 'home' ? 'bg-gradient-to-r from-aqua to-teal-500 text-gray-900 font-bold' : 'bg-gray-800 text-gray-300'}`}
                            >
                                Home Face
                            </button>
                            <button
                                onClick={() => setWatchFace('itinerary')}
                                className={`px-4 py-2 rounded-full ${watchFace === 'itinerary' ? 'bg-gradient-to-r from-aqua to-teal-500 text-gray-900 font-bold' : 'bg-gray-800 text-gray-300'}`}
                            >
                                Itinerary
                            </button>
                            <button
                                onClick={() => setWatchFace('safety')}
                                className={`px-4 py-2 rounded-full ${watchFace === 'safety' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-gray-900 font-bold' : 'bg-gray-800 text-gray-300'}`}
                            >
                                Safety
                            </button>
                        </div>

                        <div className="text-center text-gray-400">
                            <p>Rotate the crown or swipe to navigate between watch faces</p>
                            <p className="text-sm mt-2">Compatible with Apple Watch, Wear OS, and Galaxy Watch</p>
                        </div>
                    </div>

                    {/* Features Panel */}
                    <div className="lg:w-3/5">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                                <span className="bg-gradient-to-r from-aqua to-teal-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">✨</span>
                                TourEase Watch Features
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {Object.keys(features).map(key => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveFeature(key)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${activeFeature === key ? 'bg-gradient-to-br from-aqua/20 to-teal-500/20 border border-aqua/30' : 'bg-gray-800/50 hover:bg-gray-800'}`}
                                    >
                                        <div className="text-3xl mb-2">{features[key].icon}</div>
                                        <div className="font-medium text-sm text-center">{features[key].title.split(' ')[0]}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Feature Details */}
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">{features[activeFeature].icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>
                                        <p className="text-gray-400">{features[activeFeature].description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {features[activeFeature].details.map((detail, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start p-3 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-900/30"
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${index % 2 === 0 ? 'bg-gradient-to-r from-aqua to-teal-500 text-gray-900' : 'bg-gradient-to-r from-orange-500 to-amber-500 text-gray-900'}`}>
                                                ✓
                                            </div>
                                            <span>{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Feature-specific demo info */}
                                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700">
                                    <div className="flex items-center mb-2">
                                        <div className="w-3 h-3 rounded-full bg-aqua mr-2"></div>
                                        <h4 className="font-bold">Watch Integration</h4>
                                    </div>
                                    <p className="text-gray-300">
                                        {activeFeature === 'itinerary' && 'Get real-time itinerary updates and alerts directly on your watch. Adjust plans with a simple tap.'}
                                        {activeFeature === 'ai' && 'Access AI voice assistant and smart recommendations from your wrist. Ask questions and get instant translations.'}
                                        {activeFeature === 'safety' && 'One-tap emergency alerts, safety status, and nearest help locations available instantly on your watch.'}
                                        {activeFeature === 'tools' && 'Quick access to expense splitting, digital documents, and community photos right from your wrist.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* App Integration */}
                        <div className="bg-gradient-to-r from-aqua/10 to-orange-500/10 rounded-2xl p-6 border border-aqua/20">
                            <h3 className="text-2xl font-bold mb-4">Seamless Phone Integration</h3>
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 mb-6 md:mb-0">
                                    <p className="text-gray-300 mb-4">
                                        TourEase Watch syncs seamlessly with your smartphone. Plan trips on your phone,
                                        then access all information on your watch while exploring.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-aqua mr-3"></div>
                                            <span>Real-time sync between devices</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                                            <span>Notifications mirrored to watch</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-aqua mr-3"></div>
                                            <span>Offline access to critical information</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="md:w-1/2 flex justify-center">
                                    <div className="relative">
                                        <div className="w-48 h-80 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-950 border-8 border-gray-800 flex flex-col items-center justify-center p-4">
                                            <div className="text-4xl mb-4">📱</div>
                                            <div className="text-center font-bold mb-2">TourEase Mobile</div>
                                            <div className="text-gray-400 text-center text-sm">Companion App</div>
                                            <div className="mt-6 flex space-x-2">
                                                <div className="w-3 h-3 rounded-full bg-aqua"></div>
                                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                                            </div>
                                        </div>
                                        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-4xl">
                                            ⇄
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-aqua to-orange-500 flex items-center justify-center mr-3">
                                <span className="text-sm">TE</span>
                            </div>
                            <span className="text-xl font-bold">TourEase</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Open-source Intelligent Travel Assistant</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-gray-400 mb-2">Available on the App Store and Google Play</p>
                        <div className="flex justify-center md:justify-end space-x-4">
                            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                                View GitHub
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-aqua to-teal-500 text-gray-900 font-bold">
                                Download Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-600 text-sm mt-8">
                    <p>TourEase Watch Demo | This is a conceptual interface showcasing potential watch integration</p>
                </div>
            </footer>
        </div>
    );
};

export default TourEaseWatchDemo;