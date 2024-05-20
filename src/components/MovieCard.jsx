import { Link } from "react-router-dom";
import Stars from "./Stars.jsx";

const MovieCard = ({ movie }) => {
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
            <button>+</button>
            <p>{movie.main_genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
