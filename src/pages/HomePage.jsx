import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SplashImages from "../components/SplashImages";
import useSplashMovies from "../hooks/useSplashMovies";
import CarouselRecommendations from "../components/CarouselRecommendations";
import GenreButtons from "../components/GenreButtons";
import useMovieGenres from "../hooks/useMovieGenres";

const HomePage = () => {
  const { splashMovies, error } = useSplashMovies();
  const { genres, error: genresError } = useMovieGenres();
  const firstMovieTitle = splashMovies[0]?.title;
  const location = useLocation();

  useEffect(() => {
    console.log("Splash Movies:", splashMovies); // Debugging
    console.log("Genres:", genres);
  }, [splashMovies, genres, location]);

  if (error) return <p>{error}</p>;
  if (genresError) return <p>{genresError}</p>;

  return (
    <div className="container">
      <div className="main-container">
        <div className="left-sidebar">{/* Content to be decided */}</div>
        <div className="center-content">
          <div className="splash-container">
            {error ? (
              <p>{error}</p>
            ) : (
              <SplashImages splashMovies={splashMovies} />
            )}
          </div>
          <h2>Recommendations</h2>
          <CarouselRecommendations movieTitle={firstMovieTitle} />
        </div>
        <GenreButtons genres={genres} />
      </div>
    </div>
  );
};

export default HomePage;
