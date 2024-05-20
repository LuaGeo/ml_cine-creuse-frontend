import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

/* ----- PAGES ----- */
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetails from "./pages/MovieDetails";
import GenreMoviesPage from "./pages/GenreMoviesPage";

/* ----- COMPONENTS ----- */
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  console.log("Rendering App");
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  const handleLoginClose = () => setLoginVisible(false);
  const handleSignUpClose = () => setSignUpVisible(false);

  const handleLoginOpen = () => {
    setLoginVisible(true);
    setSignUpVisible(false);
  };

  const handleSignUpOpen = () => {
    setSignUpVisible(true);
    setLoginVisible(false);
  };

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);

  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  const handleUserData = (userData) => {
    if (userData && userData.token && userData.username) {
      setToken(userData.token);
      setUsername(userData.username);
      Cookies.set("token", userData.token, { expires: 7 });
      Cookies.set("username", userData.username, { expires: 7 });
    } else {
      setToken(null);
      setUsername(null);
      Cookies.remove("token");
      Cookies.remove("username");
    }
  };

  return (
    <Router>
      <div>
        <Header
          onLoginClick={handleLoginOpen}
          onSignUpClick={handleSignUpOpen}
          setVisible={setVisible}
          visible={visible}
          setVisibleLogin={setVisibleLogin}
          visibleLogin={visibleLogin}
          handleUserData={handleUserData}
          token={token}
          username={username}
          setUsername={setUsername}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/genre/:genreId" element={<GenreMoviesPage />} />
          </Routes>
        </main>
        <Footer />
        <Login
          isVisible={isLoginVisible}
          onClose={handleLoginClose}
          onUserLogin={handleUserData}
        />
        <SignUp
          isVisible={isSignUpVisible}
          onClose={handleSignUpClose}
          onLoginClick={handleLoginOpen}
        />
      </div>
    </Router>
  );
}

export default App;
