import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselRecommendations from "../components/CarouselRecommendations";
import Stars from "../components/Stars";
import CarouselActors from "../components/CarouselActors";
import LoadingProgress from "../components/LoadingProgress";
import { useFavorites } from "../hooks/favoritesContext";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [tmdbMovie, setTmdbMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();

  // Détails du film via TMDB directement (rapide) : la page ne dépend plus du
  // backend Flask, qui est lent et sérialise ses requêtes avec les
  // recommandations. On réinitialise + on annule la requête précédente à
  // chaque changement de film pour ne pas afficher les données de l'ancien.
  useEffect(() => {
    const controller = new AbortController();
    setTmdbMovie(null);

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr&append_to_response=credits`,
      { signal: controller.signal },
    )
      .then((response) => response.json())
      .then((data) => setTmdbMovie(data))
      .catch((error) => {
        if (error.name !== "AbortError")
          console.error("Error fetching movie details:", error);
      });

    return () => controller.abort();
  }, [movieId, apiKey]);

  useEffect(() => {
    setIsFavorite(favoriteMovies.includes(movieId));
  }, [favoriteMovies, movieId]);

  if (!tmdbMovie)
    return (
      <div className="center-content container">
        <LoadingProgress
          inline
          message="Chargement du film…"
          durationMs={3000}
        />
      </div>
    );

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
          src={`https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`}
          alt={tmdbMovie.title}
        />
        <div className="movie-details-text">
          <div className="movie-details-text">
            <div>
              <h2>{tmdbMovie.title}</h2>
              <h2 className="year">({year})</h2>
            </div>
            <div className="genres">
              <p>{formatedDate} •</p>
              <p>{genres} •</p>
              <p>{runtime}</p>
            </div>
            <Stars movie={{ averageRating: tmdbMovie.vote_average }} />
            <button
              className="movie-details-button"
              onClick={handleFavoriteClick}
            >
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
      <CarouselRecommendations movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
