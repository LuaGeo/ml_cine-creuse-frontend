import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselRecommendations from "../components/CarouselRecommendations";
import Stars from "../components/Stars";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/movie-details/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="center-content container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details-text">
          <h2>{movie.title}</h2>
          <Stars movie={movie} />
          <div className="overview">
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <h4>Recommendations</h4>
      <CarouselRecommendations movieTitle={movie.title} />
    </div>
  );
};

export default MovieDetails;
