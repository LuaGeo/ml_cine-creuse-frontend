// src/pages/GenreMoviesPage.jsx
import { useParams } from "react-router-dom";
import useMoviesByGenre from "../hooks/useMoviesByGenre";
import MovieCard from "../components/MovieCard";
import GenreButtons from "../components/GenreButtons";

const GenreMoviesPage = () => {
  const { genreId } = useParams();
  const movies = useMoviesByGenre(genreId); // Fetches movies for the given genre

  return (
    <div className="genre-pages">
      <div className="movie-cards-container">
        {movies.map((movie) => (
          <MovieCard key={movie.titleId} movie={movie} />
        ))}
      </div>
      <GenreButtons />
    </div>
  );
};

export default GenreMoviesPage;
