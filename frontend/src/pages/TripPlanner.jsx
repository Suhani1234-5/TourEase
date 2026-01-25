import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, DollarSign, Plane, 
  Hotel, Compass, Coffee, Camera, Mountain,
  ChevronRight, Sparkles, Clock, Heart, CheckCircle,
  X, ArrowLeft, Star
} from 'lucide-react';

function formatItinerary(plan) {
  const lines = plan.split("\n").filter(Boolean);

  return lines.map((line, index) => {
    // Day headings
    if (line.startsWith("**Day")) {
      return (
        <h3
          key={index}
          className="mt-8 mb-3 text-xl font-bold text-teal-600 dark:text-teal-400"
        >
          {line.replace(/\*\*/g, "")}
        </h3>
      );
    }

    // Section headings (Morning / Afternoon / Evening / Budget)
    if (
      line.includes("Morning") ||
      line.includes("Afternoon") ||
      line.includes("Evening") ||
      line.includes("Budget")
    ) {
      return (
        <p
          key={index}
          className="mt-4 font-semibold text-gray-900 dark:text-gray-100"
        >
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }

    // Bullet points
    if (line.trim().startsWith("*")) {
      return (
        <li
          key={index}
          className="ml-6 list-disc text-gray-700 dark:text-gray-300"
        >
          {line.replace("*", "").trim()}
        </li>
      );
    }

    // Normal text
    return (
      <p
        key={index}
        className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        {line}
      </p>
    );
  });
}

// Review Item Component
function ReviewItem({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-teal-500" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
          {label}
        </p>
        <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 'moderate',
    interests: [],
    accommodation: 'hotel'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [previousPlan, setPreviousPlan] = useState(null);
  const [refinementInput, setRefinementInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  // --- Validation Logic ---
  const isStep1Valid = formData.destination.trim() !== '' && formData.startDate !== '' && formData.endDate !== '';
  const isStep3Valid = formData.interests.length > 0;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-area,
        #print-area * {
          visibility: visible;
        }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 24px;
          background: white;
          color: black;
        }
        * {
          box-shadow: none !important;
          background: white !important;
          color: black !important;
        }
        h1, h2, h3 {
          page-break-after: avoid;
        }
        p, li {
          font-size: 12pt;
          line-height: 1.6;
        }
        h3 {
          page-break-inside: avoid;
        }
        button, nav, footer {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const interests = [
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'culture', label: 'Culture', icon: Camera },
    { id: 'food', label: 'Food & Dining', icon: Coffee },
    { id: 'relaxation', label: 'Relaxation', icon: Heart },
    { id: 'nature', label: 'Nature', icon: Compass },
    { id: 'nightlife', label: 'Nightlife', icon: Sparkles }
  ];

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const handleGenerate = async () => {
    if (!isStep1Valid || !isStep3Valid) {
        setError("Missing information. Please go back and fill in all details.");
        return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); 

      const response = await fetch("http://localhost:5000/api/trip/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = "Failed to generate trip";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch { }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.plan || data.plan.trim().length === 0) {
        throw new Error("AI returned an empty itinerary");
      }

      setGeneratedPlan(data.plan);
    } catch (err) {
      if (err.name === "AbortError") {
        setError("AI took too long. Please try again.");
      } else {
        setError(err.message || "Failed to generate trip. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async () => {
    if (!refinementInput.trim()) return;
    setIsRefining(true);
    try {
      const response = await fetch("http://localhost:5000/api/trip/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalPlan: generatedPlan,
          refinementPrompt: refinementInput,
        }),
      });

      const data = await response.json();
      if (!data.updatedPlan || data.updatedPlan.trim().length === 0) {
        throw new Error("No refined itinerary returned");
      }

      setPreviousPlan(generatedPlan);
      setGeneratedPlan(data.updatedPlan);
      setRefinementInput("");
    } catch (err) {
      console.error(err);
      alert("Failed to refine itinerary");
    } finally {
      setIsRefining(false);
    }
  };

  const handleStartOver = () => {
    setGeneratedPlan(null);
    setStep(1);
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 'moderate',
      interests: [],
      accommodation: 'hotel'
    });
    setError('');
  };

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white py-12 overflow-hidden text-center">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-orange-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Your Itinerary is Ready!</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto font-medium">Here's your personalized travel plan for {formData.destination}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div id="print-area">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 mb-8 border border-teal-200 dark:border-teal-800">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-teal-500" /> Trip Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Destination</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.destination}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Duration</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.startDate} to {formData.endDate}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Travelers</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-orange-500" /> Your Personalized Itinerary
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                  {formatItinerary(generatedPlan)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 mb-8">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Refine Your Itinerary</h3>
            <textarea
              value={refinementInput}
              onChange={(e) => setRefinementInput(e.target.value)}
              placeholder="e.g. Make it more budget friendly, add local food spots..."
              rows={3}
              className="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-teal-500/20"
            />
            <button
              onClick={handleRefine}
              disabled={isRefining}
              className={`mt-4 px-6 py-3 rounded-xl font-bold text-white transition-all ${isRefining ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"}`}
            >
              {isRefining ? "Refining..." : "Refine Itinerary"}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={handleStartOver} className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" /> Plan Another Trip
            </button>
            <button onClick={() => window.print()} className="px-8 py-4 bg-teal-500 text-white rounded-xl font-bold shadow-lg shadow-teal-500/30">
              Print Itinerary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white py-20 text-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">AI-Powered Planning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">Plan Your Perfect <br /><span className="text-orange-300">Adventure</span></h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium">Tell us your dream destination and let our AI create a personalized itinerary just for you</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Destination' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Interests' },
              { num: 4, label: 'Review' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= s.num ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                    {s.num}
                  </div>
                  <span className={`text-sm mt-2 font-semibold ${step >= s.num ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>{s.label}</span>
                </div>
                {idx < 3 && <div className={`flex-1 h-1 mx-4 rounded transition-all ${step > s.num ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-800'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Where do you want to go?</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Choose your dream destination to get started</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border dark:border-gray-800">
                <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                  <MapPin className="w-5 h-5 mr-2 text-teal-500" /> Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g., Paris, Tokyo, Bali..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border dark:border-gray-800">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    <Calendar className="w-5 h-5 mr-2 text-teal-500" /> Start Date
                  </label>
                  <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-6 py-4 outline-none" />
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border dark:border-gray-800">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    <Calendar className="w-5 h-5 mr-2 text-orange-500" /> End Date
                  </label>
                  <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-6 py-4 outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Tell us about your trip</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Help us personalize your experience</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border dark:border-gray-800">
                <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                  <Users className="w-5 h-5 mr-2 text-teal-500" /> Number of Travelers
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                    className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-xl transition-all active:scale-95"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">
                      {formData.travelers}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.travelers === 1 ? 'Traveler' : 'Travelers'}
                    </p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                    className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-xl transition-all active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border dark:border-gray-800">
                <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider"><DollarSign className="w-5 h-5 mr-2 text-teal-500" /> Budget Range</label>
                <div className="grid grid-cols-3 gap-4">
                  {['budget', 'moderate', 'luxury'].map((b) => (
                    <button key={b} onClick={() => setFormData({ ...formData, budget: b })} className={`py-4 px-6 rounded-xl font-bold transition-all ${formData.budget === b ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {b.charAt(0).toUpperCase() + b.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">What are your interests?</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Select at least one to get tailored recommendations</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = formData.interests.includes(interest.id);
                  return (
                    <button key={interest.id} onClick={() => toggleInterest(interest.id)} className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 transition-all ${isSelected ? 'border-teal-500 shadow-xl shadow-teal-500/20' : 'border-gray-200 dark:border-gray-800'}`}>
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all ${isSelected ? 'bg-teal-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}><Icon className="w-8 h-8" /></div>
                      <h3 className={`font-bold text-lg ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-gray-900 dark:text-white'}`}>{interest.label}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Review Your Trip</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Ready to see your personalized itinerary?</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 border border-teal-200 dark:border-teal-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ReviewItem icon={MapPin} label="Destination" value={formData.destination || 'Not set'} />
                    <ReviewItem icon={Calendar} label="Duration" value={formData.startDate && formData.endDate ? `${formData.startDate} to ${formData.endDate}` : 'Not set'} />
                  </div>
                  <div className="space-y-4">
                    <ReviewItem icon={DollarSign} label="Budget" value={formData.budget.charAt(0).toUpperCase() + formData.budget.slice(1)} />
                    <ReviewItem icon={Sparkles} label="Interests" value={`${formData.interests.length} selected`} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-xl border dark:border-gray-800">
                <Plane className="w-16 h-16 mx-auto mb-4 text-teal-500" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Ready to Generate Your Itinerary?</h3>
                {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !isStep1Valid || !isStep3Valid}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all shadow-lg inline-flex items-center text-white ${isGenerating || !isStep1Valid || !isStep3Valid ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-orange-500/30'}`}
                >
                  {isGenerating ? "Generating..." : <>Generate My Itinerary <ChevronRight className="ml-2 w-5 h-5" /></>}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-8">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-8 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold transition-all active:scale-95">
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !isStep1Valid) || (step === 3 && !isStep3Valid)}
                className={`ml-auto px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg inline-flex items-center text-white ${((step === 1 && !isStep1Valid) || (step === 3 && !isStep3Valid)) ? 'bg-gray-300 cursor-not-allowed opacity-60' : 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/30 active:scale-95'}`}
              >
                Continue <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-teal-500 mr-3" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">AI Trip Planner</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Your personal AI travel assistant for unforgettable adventures</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>© 2026 AI Trip Planner</span>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}