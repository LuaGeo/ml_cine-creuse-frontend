import { useState, useEffect } from "react";
import axios from "axios";

const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId) return;

    const fetchMoviesByGenre = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies-by-genre/${genreId}`,
        );

        // Fetch poster_path depuis TMDB pour chaque film
        const apiKey = import.meta.env.VITE_API_KEY;
        const moviesWithPosters = await Promise.all(
          response.data.slice(0, 20).map(async (movie) => {
            try {
              const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.titleId}?api_key=${apiKey}&language=fr`,
              );
              return {
                ...movie,
                poster_path: data.poster_path,
                title: data.title || movie.title,
              };
            } catch {
              return movie; // Si TMDB échoue, on garde le film sans poster
            }
          }),
        );

        setMovies(moviesWithPosters);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genreId]);

  return { movies, loading, error };
};

export default useMoviesByGenre;
