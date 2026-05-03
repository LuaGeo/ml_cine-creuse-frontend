import { useState, useEffect } from "react";
import axios from "axios";

const useMovieGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/genres`,
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    };

    fetchGenres();
  }, []);

  return { genres, error };
};

export default useMovieGenres;
