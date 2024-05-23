import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import getUserIdFromCookie from "./getUserIdFromCookie";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const userId = getUserIdFromCookie();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (userId) {
        try {
          const response = await axios.get("http://127.0.0.1:5000/favorites", {
            params: { userId },
          });
          setFavoriteMovies(response.data.favoriteMovies || []);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchFavoriteMovies();
  }, [userId]);

  const addFavorite = async (movieId) => {
    try {
      await axios.post("http://127.0.0.1:5000/favorites", {
        movieId,
        userId,
      });
      setFavoriteMovies((prev) => [...prev, movieId]);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Movie already in favorites");
      } else {
        console.log(error);
      }
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      await axios.delete("http://127.0.0.1:5000/favorites", {
        data: {
          movieId,
          userId,
        },
      });
      setFavoriteMovies((prev) => prev.filter((id) => id !== movieId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteMovies, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
