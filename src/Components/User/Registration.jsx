import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registration.css'; // Import the CSS file for custom styles

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    passwordHash: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');


  const navigate = useNavigate();
    const cleanInput = (input) => {
     
      const sanitized = input.replace(/<[^>]*>/g, '');
      return sanitized.replace(/\\/g, '');
    };

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
  
    if (name === "interests") {
      console.log(formData.interests);

      // For multi-select, gather all selected options
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
  
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : cleanInput(value),
      });
    }
  };
  
  const validateForm = () => {
    // Check required fields
    const requiredFields = [
      'username',
      'email',
      'passwordHash',
      'confirmPassword',
    ];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`${field} is required.`);
        return false;
      }
    }

    if (formData.username.length < 6 || formData.username.length > 21) {
      setError('Username must be between 6 and 20 characters.');
      return false;
    }
  
    if (formData.passwordHash.length < 6 || formData.passwordHash.length > 21) {
      setError('Password must be between 6 and 20 characters.');
      return false;
    }



    if (formData.passwordHash !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/user/register', formData);

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Original Fields */}
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
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>


        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Register</button>
      </form>
      <p className="login-redirect">
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
