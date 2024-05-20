import useMovieRecommendations from "../hooks/useMovieRecommendations.js";
import MovieCard from "./MovieCard.jsx";

const CarouselRecommendations = ({ movieTitle }) => {
  const { recommendations, error } = useMovieRecommendations(movieTitle);

  if (error) return <p>{error}</p>;

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {recommendations.length > 0 ? (
          recommendations.map((movie) => (
            <MovieCard key={movie.titleId} movie={movie} />
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default CarouselRecommendations;
