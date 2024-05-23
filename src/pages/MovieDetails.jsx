import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselRecommendations from "../components/CarouselRecommendations";
import Stars from "../components/Stars";
import CarouselActors from "../components/CarouselActors";
import { useFavorites } from "../hooks/favoritesContext";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [tmdbMovie, setTmdbMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/movie-details/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr&append_to_response=credits`
    )
      .then((response) => response.json())
      .then((data) => setTmdbMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  useEffect(() => {
    setIsFavorite(favoriteMovies.includes(movieId));
  }, [favoriteMovies, movieId]);

  if (!movie || !tmdbMovie) return <div>Loading...</div>;

  const releaseDate = tmdbMovie.release_date;
  const date = new Date(releaseDate);
  const formatedDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const year = date.getFullYear();
  const genres = tmdbMovie.genres.map((genre) => genre.name).join(", ");
  const runtime_h = (tmdbMovie.runtime / 60).toFixed();
  const runtime_m = tmdbMovie.runtime % 60;
  const runtime = `${runtime_h}h ${runtime_m}min`;

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeFavorite(movieId);
    } else {
      await addFavorite(movieId);
    }
  };

  return (
    <div className="center-content container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details-text">
          <div className="movie-details-text">
            <div>
              <h2>{movie.title}</h2>
              <h2 className="year">({year})</h2>
            </div>
            <div className="genres">
              <p>{formatedDate} •</p>
              <p>{genres} •</p>
              <p>{runtime}</p>
            </div>
            <Stars movie={movie} />
            <button onClick={handleFavoriteClick}>
              {isFavorite ? "✓" : "+"}
            </button>
            <div className="overview">
              <p>{tmdbMovie.overview}</p>
            </div>
          </div>
          <CarouselActors tmdbCast={tmdbMovie.credits.cast} />
        </div>
      </div>
      <h4>Recommendations</h4>
      <CarouselRecommendations movieTitle={movie.title} />
    </div>
  );
};

export default MovieDetails;
