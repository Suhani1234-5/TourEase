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
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
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

  async getUserItineraries() {
    return this.request('/itinerary/user');
  },

  async deleteItinerary(id) {
    return this.request(`/itinerary/${id}`, {
      method: 'DELETE',
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
  async analyzeItinerary(itineraryId) {
    return this.request(`/itinerary/${itineraryId}/analyze`);
  },
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

  // --- Smart Trip Planner ---
  async generateSmartItinerary(tripData) {
    return this.request('/smart-planner/generate-itinerary', {
      method: 'POST',
      body: tripData,
    });
  },

  async saveSmartItinerary(payload) {
    return this.request('/smart-planner/save', {
      method: 'POST',
      body: payload,
    });
  },

  async getSavedSmartItineraries() {
    return this.request('/smart-planner/saved-itineraries');
  },

  async getSavedSmartItinerary(id) {
    return this.request(`/smart-planner/saved-itineraries/${id}`);
  },

  async updateSmartItinerary(id, payload) {
    return this.request(`/smart-planner/saved-itineraries/${id}`, {
      method: 'PATCH',
      body: payload,
    });
  },

  async deleteSmartItinerary(id) {
    return this.request(`/smart-planner/saved-itineraries/${id}`, {
      method: 'DELETE',
    });
  },

  async toggleSmartItineraryFavorite(id) {
    return this.request(`/smart-planner/saved-itineraries/${id}/favorite`, {
      method: 'PATCH',
    });
  },

  // --- Split & Expense Tracker ---
  async getExpenseGroups() {
    return this.request('/expenses');
  },
  async createExpenseGroup(data) {
    return this.request('/expenses', {
      method: 'POST',
      body: data,
    });
  },
  async getExpenseGroup(id) {
    return this.request(`/expenses/${id}`);
  },
  async deleteExpenseGroup(id) {
    return this.request(`/expenses/${id}`, {
      method: 'DELETE',
    });
  },
  async addExpense(groupId, data) {
    return this.request(`/expenses/${groupId}/expense`, {
      method: 'POST',
      body: data,
    });
  },
  async deleteExpense(groupId, expenseId) {
    return this.request(`/expenses/${groupId}/expense/${expenseId}`, {
      method: 'DELETE',
    });
  },
};
