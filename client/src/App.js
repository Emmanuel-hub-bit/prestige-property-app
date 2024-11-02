// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertiesPage from './pages/PropertiesPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={appContainerStyle}> {/* Flex container */}
          <Header />
          <div style={mainContentStyle}> {/* Main content area */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

// Styles
const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures full viewport height
};

const mainContentStyle = {
  flex: 1,               // Allows the main content to take up remaining space
  paddingTop: '60px',    // Offset for fixed header
  paddingBottom: '60px', // Offset for fixed footer
};

export default App;
