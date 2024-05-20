import { Link, useNavigate } from "react-router-dom";
import creuseLogo from "../assets/creuse-logo.png";
import SearchBar from "./SearchBar";
import getUsernameFromCookie from "../hooks/getUsernameFromCookie";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({
  onSignUpClick,
  onLoginClick,
  handleUserData,
  token,
  username,
  setUsername,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUsernameFromCookie();
    setUsername(user);
  }, []);

  const handleLogout = () => {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete the username cookie
    setUsername(""); // Reset username in state
    handleUserData(null); // Clear user data
    Cookies.remove("token");
    Cookies.remove("username");
    navigate("/"); // Navigate to the home page after logout
  };
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <div className="header_container">
          <div className="logo_container">
            <Link to="/">
              <img src={creuseLogo} alt="Ciné La Creuse Logo" />
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="cine_name_container">
                <h1>Ciné</h1>
                <h1>La Creuse</h1>
              </div>
            </Link>
          </div>
          <SearchBar />
          <div className="buttons_container">
            {token ? (
              <>
                <FontAwesomeIcon icon={faUser} className="user_icon" />
                <span>{username}</span>
                <button onClick={handleLogout}>Déconnecter</button>
              </>
            ) : (
              <>
                <button onClick={onSignUpClick}>S'inscrire</button>
                <button onClick={onLoginClick}>Se connecter</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
