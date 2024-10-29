// src/components/PropertyItem.js

import React from 'react';

const PropertyItem = ({ property }) => {
  return (
    <div style={propertyItemStyle}>
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
};

export default PropertyItem;
