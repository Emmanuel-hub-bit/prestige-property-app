// components/Header.js

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
        {/* Always visible link to Home */}
        <Link to="/" style={linkStyles}>Home</Link>

        {/* Conditionally render these links if user is logged in */}
        {user && (
          <>
            <Link to="/properties" style={linkStyles}>Properties</Link>
            <Link to="/favorites" style={linkStyles}>Favorites</Link>
          </>
        )}

        {/* Display username and logout if logged in */}
        {user ? (
          <div style={userInfoStyles}>
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
          </div>
        ) : (
          // Display Login option if not logged in
          <Link to="/login" style={linkStyles}>Login</Link>
        )}
      </nav>
    </header>
  );
};

// Inline styles (for simplicity)
const headerStyles = { position: 'fixed', top: 0, width: '100%', background: '#333', padding: '10px', color: '#fff' };
const navStyles = { display: 'flex', alignItems: 'center', gap: '15px' };
const linkStyles = { color: '#fff', textDecoration: 'none' };
const userInfoStyles = { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' };
const logoutButtonStyles = { background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' };

export default Header;
