import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registration.css'; // Import the CSS file for custom styles

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    passwordHash: '',
    confirmPassword: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    passportNumber: '',
    interests: [],
    termsAgreement: false,
    about: '',
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
      'lastName',
      'firstName',
      'middleName',
      'dateOfBirth',
      'gender',
      'passportNumber',
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

    if (!formData.termsAgreement) {
      setError('You must agree to the terms and conditions.');
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

    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ.\-\s]+$/;

    if (!nameRegex.test(formData.firstName)) {
      setError('First Name can only contain letters, hyphens, dots, and spaces.');
      return false;
    }

    if (!nameRegex.test(formData.lastName)) {
      setError('Last Name can only contain letters, hyphens, dots, and spaces.');
      return false;
    }

    if (!nameRegex.test(formData.middleName)) {
      setError('Middle Name can only contain letters, hyphens, dots, and spaces.');
      return false;
    }

    const passportRegex = /^[A-Z]{2}\d{7}$/;

    if (!passportRegex.test(formData.passportNumber)) {
      setError('Passport Number must have 2 uppercase Latin letters followed by 7 digits.');
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

        {/* New Fields */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Passport Number:</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Interests:</label>
          <select
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            multiple
            className="form-input"
          >
            <option value="politics">Politics</option>
            <option value="culture">Culture</option>
            <option value="art">Art</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="form-group">
          
          <label>
          I agree to the terms and conditions.
            <input
              type="checkbox"
              name="termsAgreement"
              checked={formData.termsAgreement}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
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
