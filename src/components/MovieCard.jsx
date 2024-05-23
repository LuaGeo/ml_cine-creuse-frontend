import { Link } from "react-router-dom";
import Stars from "./Stars.jsx";
import { useState, useEffect } from "react";
import { useFavorites } from "../hooks/favoritesContext";

const MovieCard = ({ movie }) => {
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoriteMovies.includes(movie.titleId));
  }, [favoriteMovies, movie.titleId]);

  const handleFavoriteClick = async (event, movieId) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    event.preventDefault(); // Prevent the default action

    if (isFavorite) {
      await removeFavorite(movieId);
    } else {
      await addFavorite(movieId);
    }
  };
  return (
    <Link to={`/movie/${movie.titleId}`}>
      <div key={movie.titleId} className="carousel-item">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="details-movie-card-container">
          <div>
            <h3>{movie.title}</h3>
            <Stars movie={movie} />
          </div>
          <div className="bottom-movie-card">
            <button
              onClick={(event) => handleFavoriteClick(event, movie.titleId)}
            >
              {isFavorite ? "✓" : "+"}
            </button>
            <p>{movie.main_genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
