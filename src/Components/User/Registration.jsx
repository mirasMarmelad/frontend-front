import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registration.css' // Import the CSS file for custom styles

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/register', {
        username: formData.username,
        email: formData.email,
        passwordHash: formData.password,
      });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
      <p className="login-redirect">
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
