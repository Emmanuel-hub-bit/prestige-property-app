// src/pages/PropertiesPage.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PropertyItem from '../components/PropertyItem';
import { apiEndpoint } from '../api';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const { favorites, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await fetch(apiEndpoint('properties'), { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          setError('Failed to fetch properties. Please try again later.');
        }
      } catch (error) {
        setError('An error occurred while fetching properties. Please check your connection.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const toggleFavorite = (property) => {
    const isFavorite = favorites.some((fav) => fav.id === property.id);
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Available Properties</h2>
      {loading ? (
        <p style={loadingStyle}>Loading properties...</p>
      ) : error ? (
        <p style={errorStyle}>{error}</p>
      ) : (
        <div style={propertyListStyle}>
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyItem property={property} />
              <button onClick={() => toggleFavorite(property)} style={favoriteButtonStyle}>
                {favorites.some((fav) => fav.id === property.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
          ))}
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
const favoriteButtonStyle = { marginTop: '10px', padding: '5px', cursor: 'pointer' };

export default PropertiesPage;
