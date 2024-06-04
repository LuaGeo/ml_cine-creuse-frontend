import { useState, useEffect } from "react";
import axios from "axios";

const useSplashMovies = () => {
  const [splashMovies, setSplashMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSplashMovies = async () => {
      try {
        const { data: movieIds } = await axios.get(
          `http://127.0.0.1:8000/splash-movies`
        );

        // Fetch details for each movie using titleId
        const fetchMovieDetails = async (titleId) => {
          const apiKey = import.meta.env.VITE_API_KEY;
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${titleId}?api_key=${apiKey}&language=fr&append_to_response=credits`
          );
          return data;
        };

        const movieDetailsPromises = movieIds.map((movie) =>
          fetchMovieDetails(movie.titleId)
        );
        const movieDetails = await Promise.all(movieDetailsPromises);

        setSplashMovies(movieDetails);
      } catch (error) {
        console.error("Error fetching splash movies:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    };

    fetchSplashMovies();
  }, []);

  return { splashMovies, error };
};

export default useSplashMovies;
