// src/hooks/useMoviesByGenre.js
import { useState, useEffect } from "react";
import axios from "axios";

const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!genreId) return;

    const apiKey = import.meta.env.VITE_API_KEY; // Use API key if required or adjust authorization header as needed
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en`;

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, // Assuming bearer token is required
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genreId]);

  return movies;
};

export default useMoviesByGenre;
