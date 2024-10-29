// src/pages/SignupPage.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../api';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // For feedback messages
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiEndpoint('signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.username);
        setMessage({ type: 'success', text: 'Signup successful! Redirecting...' });
        setTimeout(() => navigate('/properties'), 1000);
      } else {
        setMessage({ type: 'error', text: 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
      console.error('Error:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      {message && <p style={message.type === 'error' ? errorStyle : successStyle}>{message.text}</p>}
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
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
        <button type="submit" style={buttonStyle}>Sign Up</button>
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

export default SignupPage;
