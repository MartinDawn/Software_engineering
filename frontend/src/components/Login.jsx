import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css'
import logoBK from '../Image/logo_BK2-removebg.png';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if (localStorage !== null) {
            localStorage.clear();
        }
      const response = await api.post('/signin/', { username, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      // Handle successful login, e.g., store tokens, redirect, etc.
      console.log('Login successful:', response.data);
      const userRole = response.data.user.role;
      if (userRole === 'manager') {
        navigate('/manager');
      } else if (userRole === 'SPSO') {
        navigate('/SPSO');
      } else {
        navigate('/student');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logoBK} alt="Logo" className="login-logo" />
        <h2>Login</h2>
      </div>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" className="login-button" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;