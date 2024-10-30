import React, { useState } from "react";
import { loginUser, registerUser } from "../api";
import "./Login.css";

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = isRegistering
        ? await registerUser(username, password)
        : await loginUser(username, password);
      setToken(response.data.token);
      setUser(username);
    } catch (error) {
      setError("Authentication failed. Please try again.");
      console.error("Login/Register failed:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title" data-testid="auth-state">{isRegistering ? "Register" : "Login"}</h2>
        {error && <p className="error-message" data-testid="auth-error-message">{error}</p>}
        <input
          data-testid="username-input"
          className="username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          data-testid="password-input"
          className="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button data-testid="auth-submit-button" className='auth-submit-button' type="submit">{isRegistering ? "Register" : "Login"}</button>
        <button data-testid="auth-switch-button" className='auth-switch-button' type='button' onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
