import { useParams } from "react-router-dom";
import useMoviesByGenre from "../hooks/useMoviesByGenre";
import useMovieGenres from "../hooks/useMovieGenres";
import MovieCard from "../components/MovieCard";
import GenreButtons from "../components/GenreButtons";
import LoadingProgress from "../components/LoadingProgress";

const GenreMoviesPage = () => {
  const { genreId } = useParams();
  const { movies, loading, error: moviesError } = useMoviesByGenre(genreId);
  const { genres, error: genresError } = useMovieGenres();

  if (moviesError) return <p>{moviesError}</p>;
  if (genresError) return <p>{genresError}</p>;
  if (!genres.length) return <p>Loading genres...</p>;

  return (
    <div className="genre-pages">
      <div className="movie-cards-container">
        {/* Titre du genre sélectionné */}
        <h2 className="genre-title">{genreId}</h2>
        {loading ? (
          <LoadingProgress message="Chargement des films…" durationMs={20000} />
        ) : (
          movies.map((movie) => <MovieCard key={movie.titleId} movie={movie} />)
        )}
      </div>
      {/* activeGenre passé pour surligner le bouton actif */}
      <GenreButtons genres={genres} activeGenre={genreId} />
    </div>
  );
};

export default GenreMoviesPage;
