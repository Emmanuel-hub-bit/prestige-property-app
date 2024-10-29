// context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for using AuthContext easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // State for managing user and auth status
  const [user, setUser] = useState(null);

  // Login function
  const login = (username) => {
    setUser({ name: username });
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
