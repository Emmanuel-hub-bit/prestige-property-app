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
      <h3>{property.name}</h3>
      <p>Location: {property.location}</p>
      <p>Price: {property.price}</p>
    </div>
  );
};

// Inline style for property item
const propertyItemStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'left',
  display: 'flex', // Use flexbox for consistent layout
  flexDirection: 'column', // Align children vertically
  height: '300px', // Set a fixed height for all items
  justifyContent: 'space-between', // Space out children evenly
};

// Inline style for property image
const imageStyle = {
  width: '100%',  // Make the image responsive
  borderRadius: '8px', // Match the card's border radius
  marginBottom: '10px' // Space between image and text
};

export default PropertyItem;
