// src/hooks/useSplashMovies.js
import { useState, useEffect } from "react";
import axios from "axios";

const useSplashMovies = () => {
  const [splashMovies, setSplashMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSplashMovies = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/splash-movies`);
        setSplashMovies(data);
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
