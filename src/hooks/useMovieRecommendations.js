import { useState, useEffect } from "react";
import axios from "axios";

const useMovieRecommendations = (movieTitle) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieTitle) return; // Prevent fetching if no movieTitle is provided

    const fetchRecommendations = async () => {
      try {
        console.log(`Fetching recommendations for: ${movieTitle}`);
        // Fetch recommendations from your backend
        const { data: recommendedMovies } = await axios.get(
          `http://127.0.0.1:5000/recommendations`,
          {
            params: { title: movieTitle },
          }
        );

        console.log("Recommended Movies:", recommendedMovies);
        setRecommendations(recommendedMovies);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(
            "Error fetching movie recommendations:",
            error.response.data.error
          );
          setError(error.response.data.error);
        } else {
          console.error("Error fetching movie recommendations:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchRecommendations();
  }, [movieTitle]); // Fetch new recommendations when movieTitle changes

  return { recommendations, error };
};

export default useMovieRecommendations;
