// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';  // Import Footer
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertiesPage from './pages/PropertiesPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}> {/* Offset for fixed header and footer */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
        <Footer /> {/* Footer always at the bottom */}
      </Router>
    </AuthProvider>
  );
};

export default App;
