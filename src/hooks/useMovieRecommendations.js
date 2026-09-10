import { useState, useEffect } from "react";
import axios from "axios";

const useMovieRecommendations = (movieId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    setError(null);
    setRecommendations([]);

    const controller = new AbortController();

    const fetchRecommendations = async () => {
      try {
        console.log(`Fetching recommendations for titleId: ${movieId}`);
        const { data: recommendedMovies } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/recommendations/${movieId}`,
          { signal: controller.signal },
        );
        console.log("Recommended Movies:", recommendedMovies);
        setRecommendations(recommendedMovies);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return; // navigation vers un autre film
        if (error.response && error.response.status === 404) {
          setError(error.response.data.error);
        } else {
          console.error("Error fetching movie recommendations:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchRecommendations();

    return () => controller.abort();
  }, [movieId]);

  return { recommendations, loading, error };
};

export default useMovieRecommendations;
