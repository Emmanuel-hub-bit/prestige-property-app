// src/api.js

// Use the deployed backend URL
export const API_BASE_URL = 'https://prestige-property-app-2.onrender.com';

// Helper function to construct endpoint URLs
export const apiEndpoint = (path) => `${API_BASE_URL}/${path}`;
