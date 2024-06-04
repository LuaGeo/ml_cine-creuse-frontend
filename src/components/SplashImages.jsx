import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const SplashImages = ({ splashMovies }) => {
  if (!splashMovies || splashMovies.length === 0) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      interval={4000}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
    >
      {splashMovies.map((movie) => {
        console.log(`Movie: ${movie.title}, Backdrop: ${movie.backdrop_path}`);
        const imageUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : "https://via.placeholder.com/500x281?text=No+Image+Available";

        return (
          <div key={movie.imdb_id} className="movie">
            <p>{movie.title}</p>
            <img
              src={imageUrl}
              alt={movie.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x281?text=No+Image+Available";
              }}
            />
            <button>+ Favoris</button>
            <Link to={`/movie/${movie.imdb_id}`}>
              <button>Infos...</button>
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
};

export default SplashImages;
