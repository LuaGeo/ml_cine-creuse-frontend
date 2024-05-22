import { Link } from "react-router-dom";
import Stars from "./Stars.jsx";
import { useState } from "react";
import axios from "axios";

const MovieCard = ({ movie, userId }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  const handleFavoriteClick = async (movieId) => {
    try {
      if (isFavorite) {
        await axios.delete(`http://127.0.0.1:5000/favorites/`, {
          data: {
            movieId: titleId,
            userId,
          },
        });
      } else {
        await axios.post("http://127.0.0.1:5000/favorites/", {
          movieId: titleId,
          userId,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div key={movie.titleId} className="carousel-item">
      <Link to={`/movie/${movie.titleId}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div className="details-movie-card-container">
        <div>
          <h3>{movie.title}</h3>
          <Stars movie={movie} />
        </div>
        <div className="bottom-movie-card">
          <button onClick={() => handleFavoriteClick(movie.titleId)}>
            {isFavorite ? "✓" : "+"}
          </button>
          <p>{movie.main_genre}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
