import { API_BASE_URL } from "../config/auth";

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // --- CHANGE STARTS HERE ---
    // 1. Get token from storage
    const token = localStorage.getItem('token');
    
    // 2. Prepare headers with Token if it exists
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      headers,
      ...options,
    };
    // --- CHANGE ENDS HERE ---

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  // ... (keep the rest of your functions exactly the same)
  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: userData,
    });
  },
  
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  async saveItinerary(itineraryData) {
    return this.request('/itinerary/save', {
      method: 'POST',
      body: itineraryData,
    });
  },

  // ... (keep all other methods like generateTrip, etc.)
  async generateTrip(tripData) {
    return this.request('/trip/generate', {
      method: 'POST',
      body: tripData,
    });
  },

  async refineTrip(originalPlan, refinementPrompt) {
    return this.request('/trip/refine', {
      method: 'POST',
      body: { originalPlan, refinementPrompt },
    });
  },
  
  // Keep all the existing weather/event methods below...
  async getItinerary(id) { return this.request(`/itinerary/${id}`); },
  async getSuggestions(itineraryId, status = null) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/itinerary/${itineraryId}/suggestions${query}`);
  },
  async applySuggestion(itineraryId, suggestionId, modifiedPlan = null) {
    return this.request(`/itinerary/${itineraryId}/apply`, {
      method: 'PATCH',
      body: { suggestionId, modifiedPlan },
    });
  },
  async rejectSuggestion(itineraryId, suggestionId, feedback = '') {
    return this.request(`/itinerary/${itineraryId}/reject`, {
      method: 'PATCH',
      body: { suggestionId, feedback },
    });
  },
  async getNearbyEvents(location, startDate, endDate, radius = 25) {
    const params = new URLSearchParams({ location, startDate, endDate, radius: radius.toString() });
    return this.request(`/events/nearby?${params}`);
  },
  async getEventsByCategory(location, category, startDate, endDate) {
    const params = new URLSearchParams({ location, startDate, endDate });
    return this.request(`/events/category/${category}?${params}`);
  },
  async getWeatherForecast(location, startDate, endDate) {
    const params = new URLSearchParams({ location, startDate, endDate });
    return this.request(`/weather/forecast?${params}`);
  },
  async getWeatherDisruptions(location, startDate, endDate) {
    const params = new URLSearchParams({ location, startDate, endDate });
    return this.request(`/weather/disruptions?${params}`);
  },
};