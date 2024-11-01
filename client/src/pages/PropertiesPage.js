// src/pages/PropertiesPage.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PropertyItem from '../components/PropertyItem';
import { apiEndpoint } from '../api';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
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

  const handleFavorite = (property) => {
    addFavorite(property);
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
              <PropertyItem 
                property={property} 
                isFavorite={favorites.some((fav) => fav.id === property.id)} 
              />
              <button onClick={() => handleFavorite(property)} style={favoriteButtonStyle}>
                Favorite
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
const propertyListStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px', 
    padding: '20px' 
};
const loadingStyle = { color: 'blue' };
const errorStyle = { color: 'red' };
const favoriteButtonStyle = { marginTop: '10px', padding: '5px', cursor: 'pointer' };

export default PropertiesPage;
