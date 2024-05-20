import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
// import Cookies from "js-cookie";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = Cookies.get("token"); // Ensure you are importing Cookies
        const response = await axios.get("/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        {favorites.length > 0 ? (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No favorite movies found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
