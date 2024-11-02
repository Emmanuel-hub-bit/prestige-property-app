// src/components/PropertyItem.js

import React from 'react';

const PropertyItem = ({ property }) => {
  return (
    <div style={propertyItemStyle}>
      <img 
        src={property.image} 
        alt={property.name} 
        style={imageStyle} 
      />
      <h3 style={titleStyle} >{property.name}</h3>
      <p style={locationStyle} >Location: {property.location}</p>
      <p style={priceStyle} >Price: {property.price}</p>
    </div>
  );
};



// Inline styles
const propertyItemStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  height: '320px', // Adjusted height for consistent layout
  justifyContent: 'space-between',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for card effect
};

const imageStyle = {
  width: '100%',
  height: '150px', // Set a fixed height for the image
  objectFit: 'cover', // Ensure the image covers the area
  borderRadius: '8px', 
  marginBottom: '10px',
};

const titleStyle = {
  fontSize: '1.2rem',
  margin: '10px 0 5px',
};

const locationStyle = {
  fontSize: '0.9rem',
  color: '#555',
  margin: '5px 0',
};

const priceStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#333',
  margin: '5px 0',
};

export default PropertyItem;
