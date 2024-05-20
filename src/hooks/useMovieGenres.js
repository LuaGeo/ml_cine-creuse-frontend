import { useState, useEffect } from "react";
import axios from "axios";

const useMovieGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const bearerToken = import.meta.env.VITE_TOKEN;

    axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        console.log("Genres fetched:", response.data.genres); // Check the fetched data
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        console.error(error.response); // This will give you more insight into what went wrong
      });
  }, []);

  return genres;
};

export default useMovieGenres;
