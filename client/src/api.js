// src/api.js

export const API_BASE_URL = 'http://127.0.0.1:5000';

// Helper function to construct endpoint URLs
export const apiEndpoint = (path) => `${API_BASE_URL}/${path}`;
