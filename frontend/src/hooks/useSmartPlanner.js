import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { validatePlannerForm } from '../utils/plannerValidation';
import { INITIAL_FORM } from '../utils/plannerConstants';

/**
 * State & API logic for Smart Trip Planner page.
 */
export function useSmartPlanner(showToast) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');
  const [savedList, setSavedList] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('planner'); // planner | saved
  const [weather, setWeather] = useState(null);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    setErrors((prev) => ({ ...prev, interests: undefined }));
  };

  const fetchWeather = useCallback(async (destination, startDate, endDate) => {
    try {
      const data = await api.getWeatherForecast(destination, startDate, endDate);
      setWeather(data.forecast || []);
    } catch {
      setWeather(null);
    }
  }, []);

  const generate = async () => {
    const { valid, errors: validationErrors } = validatePlannerForm(form);
    setErrors(validationErrors);
    if (!valid) return;

    setLoading(true);
    setApiError('');
    setGeneratedPlan(null);

    try {
      const data = await api.generateSmartItinerary({
        destination: form.destination.trim(),
        budget: Number(form.budget),
        days: Number(form.days),
        travelType: form.travelType,
        interests: form.interests,
        travelers: Number(form.travelers),
      });

      setGeneratedPlan(data.generatedPlan);
      setMeta(data.meta);

      if (data.meta?.startDate && data.meta?.endDate) {
        fetchWeather(form.destination, data.meta.startDate, data.meta.endDate);
      }

      showToast?.('Your AI itinerary is ready!', 'success');
    } catch (err) {
      setApiError(err.message || 'Failed to generate itinerary');
      showToast?.(err.message || 'Generation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveItinerary = async () => {
    if (!generatedPlan) return;
    const token = localStorage.getItem('token');
    if (!token) {
      showToast?.('Please log in to save itineraries', 'error');
      return;
    }

    setSaving(true);
    try {
      await api.saveSmartItinerary({
        destination: form.destination,
        budget: Number(form.budget),
        days: Number(form.days),
        travelType: form.travelType,
        interests: form.interests,
        travelers: Number(form.travelers),
        generatedPlan,
      });
      showToast?.('Itinerary saved to your account!', 'success');
      loadSaved();
    } catch (err) {
      showToast?.(err.message || 'Could not save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const loadSaved = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSavedList([]);
      return;
    }

    setLoadingSaved(true);
    try {
      const data = await api.getSavedSmartItineraries();
      setSavedList(data.itineraries || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load saved trips', 'error');
    } finally {
      setLoadingSaved(false);
    }
  }, [showToast]);

  const deleteItinerary = async (id) => {
    try {
      await api.deleteSmartItinerary(id);
      setSavedList((prev) => prev.filter((i) => i._id !== id));
      showToast?.('Itinerary deleted', 'success');
    } catch (err) {
      showToast?.(err.message || 'Delete failed', 'error');
    }
  };

  const updateItinerary = async (id, payload) => {
    try {
      const data = await api.updateSmartItinerary(id, payload);
      setSavedList((prev) =>
        prev.map((i) => (i._id === id ? data.itinerary : i))
      );
      showToast?.('Itinerary updated', 'success');
      return data.itinerary;
    } catch (err) {
      showToast?.(err.message || 'Update failed', 'error');
      throw err;
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const data = await api.toggleSmartItineraryFavorite(id);
      setSavedList((prev) =>
        prev.map((i) =>
          i._id === id ? { ...i, isFavorite: data.isFavorite } : i
        )
      );
    } catch (err) {
      showToast?.(err.message || 'Could not update favorite', 'error');
    }
  };

  const resetPlanner = () => {
    setForm(INITIAL_FORM);
    setGeneratedPlan(null);
    setMeta(null);
    setApiError('');
    setErrors({});
    setWeather(null);
  };

  const exportPdf = () => {
    window.print();
  };

  return {
    form,
    errors,
    generatedPlan,
    meta,
    loading,
    saving,
    apiError,
    savedList,
    loadingSaved,
    activeTab,
    setActiveTab,
    weather,
    updateField,
    toggleInterest,
    generate,
    saveItinerary,
    loadSaved,
    deleteItinerary,
    updateItinerary,
    toggleFavorite,
    resetPlanner,
    exportPdf,
    setGeneratedPlan,
  };
}
