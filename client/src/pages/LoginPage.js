// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you’d verify the username with a backend request here
    login(username); // Set the user in context as logged in
    navigate('/properties'); // Redirect to properties page
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

// Inline styles for basic formatting
const containerStyle = { textAlign: 'center', padding: '20px' };
const inputStyle = { margin: '10px 0', padding: '5px', width: '80%' };
const buttonStyle = { padding: '5px 10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' };

export default LoginPage;
