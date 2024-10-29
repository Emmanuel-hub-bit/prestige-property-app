// src/components/ProtectedRoute.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render children if the user is authenticated
  return children;
};

export default ProtectedRoute;
