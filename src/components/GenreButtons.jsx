import { useNavigate } from "react-router-dom";
import useMovieGenres from "../hooks/useMovieGenres";

const GenreButtons = () => {
  const genres = useMovieGenres();
  const navigate = useNavigate();

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`); // Navigate to a new route that displays all movies for this genre
  };

  return (
    <div className="right-area">
      <h2>Genres</h2>
      <div className="buttons-container">
        {genres.map((genre) => (
          <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreButtons;
