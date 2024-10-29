// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // For feedback messages
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiEndpoint('login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.username);
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/properties'), 1000);
      } else {
        setMessage({ type: 'error', text: 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
      console.error('Error:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      {message && <p style={message.type === 'error' ? errorStyle : successStyle}>{message.text}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

// Inline styles for feedback messages
const containerStyle = { textAlign: 'center', padding: '20px' };
const inputStyle = { margin: '10px 0', padding: '5px', width: '80%' };
const buttonStyle = { padding: '5px 10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' };
const successStyle = { color: 'green' };
const errorStyle = { color: 'red' };

export default LoginPage;
