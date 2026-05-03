import { useNavigate } from "react-router-dom";

const GenreButtons = ({ genres, activeGenre }) => {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <div className="right-area">
      <h2>Genres</h2>
      <div className="buttons-container">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={activeGenre === genre ? "active" : ""}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreButtons;
