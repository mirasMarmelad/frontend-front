import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; // Importing js-cookie to manage cookies
import "./Login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true // Ensure cookies are sent with the request
      });

      if (response.status === 200) {
        Cookies.set('userToken', response.data.token, { expires: 1 }); // Set a cookie with a 1-day expiration
        navigate("/manga");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="switch-form">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
