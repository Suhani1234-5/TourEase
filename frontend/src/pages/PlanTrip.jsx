import React, { useState } from "react";
import { destinations } from "../utils/destinationsData";

export default function PlanTrip() {
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "",
    interests: [],
  });

  const interestOptions = [
    "Adventure",
    "Culture",
    "Food",
    "Nature",
    "Relaxation",
    "Shopping",
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function toggleInterest(interest) {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Future AI itinerary integration point
    console.log("Planned Trip Data:", formData);

    alert("Trip preferences saved! (AI itinerary coming soon)");
    setFormData({
      destination: "",
      duration: "",
      budget: "",
      interests: [],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Plan Your Trip</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Tell us your preferences and we’ll help plan your perfect trip.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6"
        >
          {/* Destination */}
          <div>
            <label className="block font-semibold mb-2">Destination</label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block font-semibold mb-2">Trip Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g. 5"
              className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block font-semibold mb-2">Budget</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select budget range</option>
              <option value="$">Budget ($)</option>
              <option value="$$">Moderate ($$)</option>
              <option value="$$$">Luxury ($$$)</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block font-semibold mb-3">Interests</label>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border transition ${formData.interests.includes(interest)
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700"
                    }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Generate Trip Plan
          </button>
        </form>

        {/* AI Placeholder */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          AI-powered itinerary generation will be added here in future updates.
        </div>
      </div>
    </div>
  );
}
