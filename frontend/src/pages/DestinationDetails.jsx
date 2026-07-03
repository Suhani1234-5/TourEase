import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, TrendingUp } from "lucide-react";
import { destinations } from "../utils/destinationsData";
import { useFavorites } from "../hooks/useFavorites";
import ReviewPanel from "../components/features/reviews/ReviewPanel";
import { getCoordinates } from "../utils/geocoder";
import DestinationMap from "../components/DestinationMap";
import CurrencyConverterWidget from "../components/CurrencyConverterWidget";

class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Map rendering error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[350px] bg-gray-100 dark:bg-gray-950 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 p-4 text-center">
          <span className="text-orange-500 text-lg mb-1">🗺️</span>
          <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Map loading issue</p>
          <p className="text-xs text-gray-450 dark:text-gray-550 mt-1 max-w-[250px] mx-auto">
            Interactive map couldn't load. Try refreshing or check your connection.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

class WidgetErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Widget rendering error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4 text-xs text-gray-500 text-center">
          ⚠️ Currency converter is temporarily unavailable.
        </div>
      );
    }
    return this.props.children;
  }
}

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  // 1. Find the destination FIRST!
  const destination = destinations.find((d) => String(d.id) === String(id));

  // 2. NOW you can use it to set your default state!
  const [liveRating, setLiveRating] = useState(destination?.rating || 0);
  const [liveReviewsCount, setLiveReviewsCount] = useState(
    destination?.reviews || 0,
  );

  // ---  ADDITIONS START HERE ---
  const [cityCenter, setCityCenter] = useState(null);
  const [mapPins, setMapPins] = useState([]);
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    async function loadMapLocations() {
      if (!destination) return;
      setLoadingMap(true);

      const centerCoords = await getCoordinates(destination.name);
      setCityCenter(centerCoords);

      const generatedPins = [];
      for (const highlightText of destination.highlights) {
        const coords = await getCoordinates(highlightText, destination.name);
        if (coords) {
          generatedPins.push({ name: highlightText, coordinates: coords });
        }
      }

      setMapPins(generatedPins);
      setLoadingMap(false);
    }

    loadMapLocations();
  }, [destination]);
  // ---  ADDITIONS END HERE ---

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <button
          onClick={() => navigate("/destinations")}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div
                className="h-[420px] bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-3xl font-bold">{destination.name}</h1>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{liveRating}</span>{" "}
              {/* Changed! */}
              <span className="text-gray-500 dark:text-gray-400">
                ({liveReviewsCount} reviews) {/* Changed! */}
              </span>
            </div>

            {/* Info Chips */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <InfoChip
                icon={MapPin}
                label={`Best for: ${destination.bestFor}`}
              />
              <InfoChip icon={Clock} label={`Season: ${destination.season}`} />
              <InfoChip
                icon={TrendingUp}
                label={`Budget: ${destination.cost}`}
              />
            </div>

            {/* Overview */}
            {destination.overview && (
              <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-2">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {destination.overview}
                </p>
              </div>
            )}

            {/* Highlights */}
            {/* Highlights */}
            {destination.highlights && (
              <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                
                {/* Side-by-side layout layout split */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  
                  {/* Left Column: List with interactive indicator dots */}
                  <div className="md:col-span-1">
                    <ul className="space-y-2.5">
                      {destination.highlights.map((item, index) => (
                        <li 
                          key={index} 
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-colors"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] inline-block shrink-0" />
                          <span className="text-sm font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Live Interactive Leaflet Map */}
                  <div className="md:col-span-2 w-full">
                    {loadingMap ? (
                      <div className="w-full h-[350px] bg-gray-100 dark:bg-gray-950 animate-pulse rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-800">
                        Plotting interactive points of interest...
                      </div>
                    ) : (
                      <MapErrorBoundary>
                        <DestinationMap 
                          center={cityCenter}
                          destinationName={destination.name}
                          attractions={mapPins}
                        />
                      </MapErrorBoundary>
                    )}
                  </div>

                </div>
              </div>
            )}

            <div className="mt-12">
              <ReviewPanel
                destinationId={destination.id || destination._id}
                onStatsUpdate={(avg, total) => {
                  // Grab the baseline numbers
                  const baseRating = destination?.rating || 4.8;
                  const baseCount = destination?.reviews || 1200;

                  if (total > 0) {
                    // Combine them!
                    const combinedCount = baseCount + total;
                    const combinedRating =
                      (baseRating * baseCount + avg * total) / combinedCount;

                    setLiveRating(combinedRating.toFixed(1));
                    setLiveReviewsCount(combinedCount);
                  } else {
                    // Fallback to baseline
                    setLiveRating(baseRating);
                    setLiveReviewsCount(baseCount);
                  }
                }}
              />
            </div>
          </div>{" "}
          {/* <--- END OF LEFT SECTION */}
          {/* Right Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                  Starting from
                </span>
                <div className="text-3xl font-extrabold text-teal-600 dark:text-indigo-400 mt-1">
                  ${destination.price || 1500} <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">USD</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className="w-full bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  {isFavorite(destination.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>

                <button
                  onClick={() =>
                    navigate("/trip-planner", {
                      state: { destinationName: destination.name },
                    })
                  }
                  className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold transition"
                >
                  Plan this Trip
                </button>
              </div>

              <button
                onClick={() => navigate("/destinations")}
                className="w-full text-center text-teal-650 dark:text-indigo-400 font-semibold hover:underline text-sm"
              >
                Explore more destinations
              </button>

              <WidgetErrorBoundary>
                <CurrencyConverterWidget basePriceUsd={destination.price || 1500} />
              </WidgetErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, label }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
      <Icon className="w-5 h-5 text-teal-600 dark:text-indigo-600" />
      <span className="text-sm text-gray-800 dark:text-gray-200">
        {label}
      </span>
    </div>
  );
}
