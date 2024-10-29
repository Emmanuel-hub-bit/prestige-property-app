// src/pages/PropertiesPage.js

import React, { useEffect, useState } from 'react';
import PropertyItem from '../components/PropertyItem';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Simulate fetching properties from an API
    const fetchProperties = async () => {
      // Dummy data for properties
      const propertyData = [
        { id: 1, name: 'Luxury Villa', location: 'California', price: '$1,000,000' },
        { id: 2, name: 'Modern Apartment', location: 'New York', price: '$850,000' },
        { id: 3, name: 'Beach House', location: 'Miami', price: '$950,000' },
      ];
      setProperties(propertyData); // Set the fetched properties
    };
    fetchProperties();
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Available Properties</h2>
      <div style={propertyListStyle}>
        {properties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = { textAlign: 'center', padding: '20px' };
const propertyListStyle = { display: 'grid', gap: '10px', padding: '20px' };

export default PropertiesPage;
