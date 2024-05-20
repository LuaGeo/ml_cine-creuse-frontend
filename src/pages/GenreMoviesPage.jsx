// src/pages/GenreMoviesPage.jsx
import { useParams } from "react-router-dom";
import useMoviesByGenre from "../hooks/useMoviesByGenre";
import useMovieGenres from "../hooks/useMovieGenres";
import MovieCard from "../components/MovieCard";
import GenreButtons from "../components/GenreButtons";
import LoadingSpinner from "../components/LoadingSpinner";

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
        {loading ? (
          <LoadingSpinner />
        ) : (
          movies.map((movie) => <MovieCard key={movie.titleId} movie={movie} />)
        )}
      </div>
      <GenreButtons genres={genres} />
    </div>
  );
};

export default GenreMoviesPage;
