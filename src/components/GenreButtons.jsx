import { useNavigate } from "react-router-dom";

const GenreButtons = ({ genres }) => {
  const navigate = useNavigate();

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`); // Navigate to a new route that displays all movies for this genre
  };

  return (
    <div className="right-area">
      <h2>Genres</h2>
      <div className="buttons-container">
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreButtons;
