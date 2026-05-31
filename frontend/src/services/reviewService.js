import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const fetchReviews = async (destinationId) => {
  const response = await axios.get(`${API_URL}/${destinationId}`);
  return response.data;
};

// THIS is the exact function React is looking for!
export const submitReview = async (destinationId, reviewData) => {
  const response = await axios.post(`${API_URL}/${destinationId}`, reviewData, getAuthHeaders());
  return response.data;
};

export const deleteReview = async (reviewId) => {
  // Notice we use axios.delete instead of axios.post!
  const response = await axios.delete(`${API_URL}/${reviewId}`, getAuthHeaders());
  return response.data;
};

export const likeReview = async (reviewId) => {
  const response = await axios.patch(`${API_URL}/${reviewId}/like`, {}, getAuthHeaders());
  return response.data;
};
