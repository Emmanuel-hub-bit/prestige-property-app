// src/components/Header.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={headerStyles}>
      <nav style={navStyles}>
        {/* Conditionally render Home link if user is not logged in */}
        {!user && (
          <Link to="/" style={linkStyles}>Home</Link>
        )}

        {/* Conditionally render Properties and Favorites links if user is logged in */}
        {user && (
          <>
            <Link to="/properties" style={linkStyles}>Properties</Link>
            <Link to="/favorites" style={linkStyles}>Favorites</Link>
            {/* <span style={userInfoStyles}>
              Welcome, {user.name}!
              <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
            </span> */}
            <div style={userContainerStyles}>
              <span style={welcomeTextStyles}>Welcome, {user.name}!</span>
              <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
            </div>
          </>
        )}

        {/* Show Login link only if user is not logged in */}
        {!user && (
          <Link to="/login" style={linkStyles}>Login</Link>
        )}
      </nav>
    </header>
  );
};

// Inline styles (for simplicity)
// const headerStyles = { position: 'fixed', top: 0, width: '100%', background: '#333', padding: '10px', color: '#fff', zIndex: 10 };
// const navStyles = { display: 'flex', alignItems: 'center', gap: '15px' };
// const linkStyles = { color: '#fff', textDecoration: 'none' };
// const userInfoStyles = { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' };
// const logoutButtonStyles = { background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' };

const headerStyles = {
  position: 'fixed',
  top: 0,
  width: '100%',
  background: '#333',
  padding: '10px 20px',
  color: '#fff',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const navStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap', // Allows wrapping if space is tight
};

const linkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
};

const userContainerStyles = {
  marginLeft: 'auto', // Pushes user info to the right
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const welcomeTextStyles = {
  fontSize: '0.9rem',
  color: '#ddd',
  whiteSpace: 'nowrap', // Prevents the text from wrapping
};

const logoutButtonStyles = {
  background: 'transparent',
  border: '1px solid #fff', // Adds a border for visibility
  color: '#fff',
  cursor: 'pointer',
  padding: '5px 10px',
  fontSize: '0.9rem',
  borderRadius: '4px', // Smooth edges
  whiteSpace: 'nowrap', // Prevents button text from wrapping
};

export default Header;
