// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for using AuthContext easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // Store favorites

  // Login function
  const login = (username) => {
    setUser({ name: username });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setFavorites([]); // Clear favorites on logout
  };

  // Add a property to favorites
  const addFavorite = (property) => {
    setFavorites((prev) => [...prev, property]);
  };

  // Remove a property from favorites
  const removeFavorite = (propertyId) => {
    setFavorites((prev) => prev.filter((property) => property.id !== propertyId));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
