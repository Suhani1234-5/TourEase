import axios from "axios";

// Change import.meta.env to process.env for Node.js
const API_URL = `${process.env.VITE_API_URL || 'http://localhost:3000'}/api/reviews`;

export const fetchReviews = async (destinationId) => {
  const response = await axios.get(`${API_URL}/${destinationId}`);
  return response.data;
};

export const submitReview = async (destinationId, reviewData) => {
  const response = await axios.post(`${API_URL}/${destinationId}`, reviewData);
  return response.data;
};