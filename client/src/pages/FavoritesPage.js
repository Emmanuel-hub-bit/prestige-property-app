// src/pages/FavoritesPage.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PropertyItem from '../components/PropertyItem';

const FavoritesPage = () => {
  const { favorites } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => setLoading(false), 500); // Simulate loading for demo
    } catch (error) {
      setError('An error occurred while loading favorites.');
      console.error('Error:', error);
    }
  }, [favorites]);

  return (
    <div style={containerStyle}>
      <h2>Your Favorite Properties</h2>
      {loading ? (
        <p style={loadingStyle}>Loading favorites...</p>
      ) : error ? (
        <p style={errorStyle}>{error}</p>
      ) : (
        <div style={propertyListStyle}>
          {favorites.length > 0 ? (
            favorites.map((property) => <PropertyItem key={property.id} property={property} />)
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Inline styles
const containerStyle = { textAlign: 'center', padding: '20px' };
const propertyListStyle = { display: 'grid', gap: '10px', padding: '20px' };
const loadingStyle = { color: 'blue' };
const errorStyle = { color: 'red' };

export default FavoritesPage;
