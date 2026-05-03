import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getRecommendations = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/recommendations`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
