import SplashImages from "../components/SplashImages";
import useSplashMovies from "../hooks/useSplashMovies";
import CarouselRecommendations from "../components/CarouselRecommendations";
import GenreButtons from "../components/GenreButtons";

const HomePage = () => {
  const { splashMovies, error } = useSplashMovies();
  const firstMovieTitle = splashMovies[0]?.title;

  return (
    <div className="container">
      <div className="main-container">
        <div className="left-sidebar">{/* Content to be decided */}</div>
        <div className="center-content">
          <div className="splash-container">
            {error ? <p>{error}</p> : <SplashImages movies={splashMovies} />}
          </div>
          <h2>Recommendations</h2>
          <CarouselRecommendations movieTitle={firstMovieTitle} />
        </div>
        <GenreButtons />
      </div>
    </div>
  );
};

export default HomePage;
