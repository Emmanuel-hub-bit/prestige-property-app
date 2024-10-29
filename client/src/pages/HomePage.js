// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={containerStyle}>
      <h1>Welcome to Prestige Properties</h1>
      <p style={descriptionStyle}>
        Discover your dream property! Browse listings, save your favorites, and find the perfect place to call home.
      </p>
      <div style={buttonContainerStyle}>
        <Link to="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>Log In</button>
        </Link>
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = { textAlign: 'center', padding: '40px' };
const descriptionStyle = { fontSize: '18px', marginBottom: '20px', color: '#555' };
const buttonContainerStyle = { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' };
const buttonStyle = { padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' };

export default HomePage;
