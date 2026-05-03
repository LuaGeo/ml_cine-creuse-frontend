import { useState, useEffect } from "react";
import axios from "axios";

const useTopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // ← ajout
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/top-movies`,
        );

        const apiKey = import.meta.env.VITE_API_KEY;
        const moviesWithDetails = await Promise.all(
          data.map(async (movie) => {
            try {
              const { data: tmdb } = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.titleId}?api_key=${apiKey}&language=fr`,
              );
              return {
                titleId: movie.titleId,
                averageRating: movie.averageRating,
                title: tmdb.title,
                poster_path: tmdb.poster_path,
                main_genre: tmdb.genres?.[0]?.name || "",
              };
            } catch {
              return null;
            }
          }),
        );

        setMovies(moviesWithDetails.filter(Boolean));
      } catch (error) {
        console.error("Error fetching top movies:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // ← ajout
      }
    };

    fetchTopMovies();
  }, []);

  return { movies, loading, error }; // ← ajout loading
};

export default useTopMovies;
