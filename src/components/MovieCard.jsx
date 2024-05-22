import { Link } from "react-router-dom";
import Stars from "./Stars.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const MovieCard = ({ movie, userId }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  useEffect(() => {
    console.log(`Favorite state for movie ${movie.titleId}: ${isFavorite}`);
  }, [isFavorite]);

  const handleFavoriteClick = async (event, movieId) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("handleFavoriteClick was called");

    try {
      if (isFavorite) {
        await axios.delete(`http://127.0.0.1:5000/favorites`, {
          data: {
            movieId,
            userId,
          },
        });
      } else {
        await axios.post("http://127.0.0.1:5000/favorites", {
          movieId,
          userId,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
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
