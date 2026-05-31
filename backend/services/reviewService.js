import axios from "axios";

// This pulls http://127.0.0.1:5000/api directly from your .env file!
const API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

export const fetchReviews = async (destinationId) => {
  const response = await axios.get(`${API_URL}/${destinationId}`);
  return response.data;
};

export const submitReview = async (destinationId, reviewData) => {
  const response = await axios.post(`${API_URL}/${destinationId}`, reviewData);
  return response.data;
};
