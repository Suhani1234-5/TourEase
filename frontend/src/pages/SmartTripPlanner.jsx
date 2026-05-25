import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  Save,
  Printer,
  RotateCcw,
  LogIn,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useSmartPlanner } from '../hooks/useSmartPlanner';
import PlannerForm from '../components/smartPlanner/PlannerForm';
import ItineraryResultCards from '../components/smartPlanner/ItineraryResultCards';
import LoadingSkeleton from '../components/smartPlanner/LoadingSkeleton';
import ErrorAlert from '../components/smartPlanner/ErrorAlert';
import SavedItinerariesList from '../components/smartPlanner/SavedItinerariesList';

/**
 * AI Smart Trip Planner — main page at /smart-trip-planner
 */
export default function SmartTripPlanner() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const planner = useSmartPlanner(showToast);

  useEffect(() => {
    if (planner.activeTab === 'saved' && isLoggedIn) {
      planner.loadSaved();
    }
  }, [planner.activeTab, isLoggedIn]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #smart-planner-print, #smart-planner-print * { visibility: visible; }
        #smart-planner-print { position: absolute; left: 0; top: 0; width: 100%; }
        nav, footer, button { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleViewSaved = (item) => {
    planner.setGeneratedPlan(item.generatedPlan);
    planner.setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-orange-300" />
            AI Smart Trip Planner
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Plan smarter. Travel better.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Day-by-day itineraries, hotels, food, transport & cost estimates — powered by AI.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 flex gap-2 py-3">
          <button
            type="button"
            onClick={() => planner.setActiveTab('planner')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
              planner.activeTab === 'planner'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2 -mt-0.5" />
            New plan
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isLoggedIn) {
                showToast('Log in to view saved itineraries', 'error');
                navigate('/login');
                return;
              }
              planner.setActiveTab('saved');
            }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
              planner.activeTab === 'saved'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Bookmark className="w-4 h-4 inline mr-2 -mt-0.5" />
            Saved trips
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {planner.activeTab === 'planner' ? (
          <div className="space-y-10">
            <PlannerForm
              form={planner.form}
              errors={planner.errors}
              loading={planner.loading}
              onChange={planner.updateField}
              onToggleInterest={planner.toggleInterest}
              onSubmit={planner.generate}
            />

            {planner.apiError && (
              <ErrorAlert message={planner.apiError} onRetry={planner.generate} />
            )}

            {planner.loading && <LoadingSkeleton />}

            {planner.generatedPlan && !planner.loading && (
              <>
                <div className="flex flex-wrap gap-3 justify-end print:hidden">
                  {!isLoggedIn ? (
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm"
                    >
                      <LogIn className="w-4 h-4" /> Log in to save
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={planner.saveItinerary}
                      disabled={planner.saving}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {planner.saving ? 'Saving...' : 'Save itinerary'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={planner.exportPdf}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Printer className="w-4 h-4" /> Export PDF
                  </button>
                  <button
                    type="button"
                    onClick={planner.resetPlanner}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> New trip
                  </button>
                </div>

                <ItineraryResultCards
                  plan={planner.generatedPlan}
                  meta={planner.meta}
                  weather={planner.weather}
                />
              </>
            )}
          </div>
        ) : (
          <SavedItinerariesList
            itineraries={planner.savedList}
            loading={planner.loadingSaved}
            onDelete={planner.deleteItinerary}
            onUpdate={planner.updateItinerary}
            onToggleFavorite={planner.toggleFavorite}
            onView={handleViewSaved}
          />
        )}
      </main>
    </div>
  );
}
