import { useState, useEffect } from "react";
import axios from "axios";

const useMovieRecommendations = (movieId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchRecommendations = async () => {
      try {
        console.log(`Fetching recommendations for titleId: ${movieId}`);
        const { data: recommendedMovies } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/recommendations/${movieId}`,
        );
        console.log("Recommended Movies:", recommendedMovies);
        setRecommendations(recommendedMovies);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError(error.response.data.error);
        } else {
          console.error("Error fetching movie recommendations:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return { recommendations, error };
};

export default useMovieRecommendations;
