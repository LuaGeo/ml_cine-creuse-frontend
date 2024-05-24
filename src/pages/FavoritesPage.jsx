import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";

const FavoritesPage = () => {
  const { userId } = useParams();
  const [favoriteMovies, setFavoritesMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/favorites/list/${userId}`
        );
        const movieIds = response.data.favoriteMovies;
        const movies = await Promise.all(
          movieIds.map(async (movieId) => {
            const movieResponse = await axios.get(
              `http://127.0.0.1:5000/movie-details/${movieId}`
            );
            return movieResponse.data;
          })
        );
        setFavoritesMovies(movies);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  if (!favoriteMovies.length) {
    return <div>No favorite movies found.</div>;
  }

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <div className="movie-cards-container">
        {favoriteMovies.map((movie) => (
          <MovieCard key={movie.titleId} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
