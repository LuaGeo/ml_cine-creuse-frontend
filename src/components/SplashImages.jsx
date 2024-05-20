import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const SplashImages = ({ movies }) => {
  if (!movies || movies.length === 0) {
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
      {movies.map((movie) => (
        <div key={movie.titleId} className="movie">
          <p>{movie.title}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
          <button>+ Favoris</button>
          <Link to={`/movie/${movie.titleId}`}>
            <button>Infos...</button>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default SplashImages;
