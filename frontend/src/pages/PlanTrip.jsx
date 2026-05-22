import React, { useState } from "react";
import { destinations } from "../utils/destinationsData";

export default function PlanTrip() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    departureLocation: "",
    departureTime: "",
    travelDate: "",
    destination: "",
    duration: "",
    travelers: "",
    budget: "",
    interests: [],
  });

  const [errors, setErrors] = useState({});

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function toggleInterest(interest) {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function validateForm() {
    const newErrors = {};

    // Date validation
    if (formData.travelDate < today) {
      newErrors.travelDate = "Travel date cannot be earlier than today.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number should contain 10-15 digits.";
    }

    // Travelers validation
    if (formData.travelers <= 0 || formData.travelers === "") {
      newErrors.travelers = "Please enter a valid number of travelers.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Planned Trip Data:", formData);

    alert("Trip preferences saved successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      departureLocation: "",
      departureTime: "",
      travelDate: "",
      destination: "",
      duration: "",
      travelers: "",
      budget: "",
      interests: [],
    });

    setErrors({});
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Plan Your Trip</h1>

          <p className="text-gray-600 dark:text-gray-400">
            Tell us your travel preferences and we’ll help create your perfect
            journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-8 shadow-sm"
        >
          {/* Traveler Details */}
          <div>
            <h2 className="text-xl font-semibold mb-5">Traveler Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block font-medium mb-2">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-2">Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-2">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Departure Location */}
              <div>
                <label className="block font-medium mb-2">
                  Departure Location
                </label>

                <input
                  type="text"
                  name="departureLocation"
                  value={formData.departureLocation}
                  onChange={handleChange}
                  required
                  placeholder="Where are you traveling from?"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div>
            <h2 className="text-xl font-semibold mb-5">Trip Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Travel Date */}
              <div>
                <label className="block font-medium mb-2">Travel Date</label>

                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {errors.travelDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.travelDate}
                  </p>
                )}
              </div>

              {/* Departure Time */}
              <div>
                <label className="block font-medium mb-2">
                  Preferred Departure Time
                </label>

                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block font-medium mb-2">Destination</label>

                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                <label className="block font-medium mb-2">
                  Trip Duration (days)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g. 5"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Travelers */}
              <div>
                <label className="block font-medium mb-2">
                  Number of Travelers
                </label>

                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter number of travelers"
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {errors.travelers && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.travelers}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="block font-medium mb-2">Budget</label>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select budget range</option>

                  <option value="$">Budget ($)</option>

                  <option value="$$">Moderate ($$)</option>

                  <option value="$$$">Luxury ($$$)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block font-semibold mb-4">Interests</label>

            <div className="flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border transition duration-200 ${
                    formData.interests.includes(interest)
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 hover:border-teal-400"
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
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Generate Trip Plan
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          AI-powered itinerary generation will be added in future updates.
        </div>
      </div>
    </div>
  );
}
