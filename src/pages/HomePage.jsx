import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SplashImages from "../components/SplashImages";
import useSplashMovies from "../hooks/useSplashMovies";
import GenreButtons from "../components/GenreButtons";
import useMovieGenres from "../hooks/useMovieGenres";
import useTopMovies from "../hooks/useTopMovies";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { splashMovies, error } = useSplashMovies();
  const { genres, error: genresError } = useMovieGenres();
  const {
    movies: topMovies,
    loading: topLoading,
    error: topError,
  } = useTopMovies();
  const location = useLocation();

  useEffect(() => {
    console.log("Splash Movies:", splashMovies);
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
          {topError ? (
            <p>{topError}</p>
          ) : topLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="carousel-wrapper">
              <div className="carousel">
                {topMovies.map((movie) => (
                  <MovieCard key={movie.titleId} movie={movie} />
                ))}
              </div>
            </div>
          )}
        </div>
        <GenreButtons genres={genres} />
      </div>
    </div>
  );
};

export default HomePage;
