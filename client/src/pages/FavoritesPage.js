// src/pages/FavoritesPage.js

import React, { useState, useEffect } from 'react';
import PropertyItem from '../components/PropertyItem';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Simulate fetching favorite properties from an API
    const fetchFavorites = async () => {
      // Dummy data for favorite properties
      const favoriteData = [
        { id: 2, name: 'Modern Apartment', location: 'New York', price: '$850,000' },
        { id: 3, name: 'Beach House', location: 'Miami', price: '$950,000' },
      ];
      setFavorites(favoriteData); // Set the fetched favorites
    };
    fetchFavorites();
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Your Favorite Properties</h2>
      <div style={propertyListStyle}>
        {favorites.length > 0 ? (
          favorites.map((property) => (
            <PropertyItem key={property.id} property={property} />
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = { textAlign: 'center', padding: '20px' };
const propertyListStyle = { display: 'grid', gap: '10px', padding: '20px' };

export default FavoritesPage;
