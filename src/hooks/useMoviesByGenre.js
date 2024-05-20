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
          `http://127.0.0.1:5000/movies-by-genre/${genreId}`
        );
        setMovies(response.data);
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
