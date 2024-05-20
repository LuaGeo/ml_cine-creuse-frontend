import { useState } from "react";

const SignUp = ({ isVisible, onClose, onLoginClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isVisible) return null;

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    };

    const response = await fetch("http://localhost:5000/register", requestData);

    if (response.ok) {
      const data = await response.json();
      alert("Registration successful: " + data.message);
      onClose(); // Close the modal on successful registration
    } else {
      const data = await response.json();
      alert("Failed to register: " + data.error);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1>S'inscrire</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">S'inscrire</button>
        </form>
        <p>
          Tu as déjà un compte ?{" "}
          <span onClick={onLoginClick} className="span-connect">
            Connecte-toi
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
