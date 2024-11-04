// src/api.js

// Use the deployed backend URL
// export const API_BASE_URL = 'https://prestige-property-app-2.onrender.com';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5555';


// Helper function to construct endpoint URLs
export const apiEndpoint = (path) => `${API_BASE_URL}/${path}`;
