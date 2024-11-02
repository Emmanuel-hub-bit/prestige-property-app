// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>Connect with us:</p>
      <div style={socialLinksContainer}>
        <a href="https://wa.me/1234567890" style={linkStyle} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="https://instagram.com/yourcompany" style={linkStyle} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://twitter.com/yourcompany" style={linkStyle} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <p style={textStyle}>© {new Date().getFullYear()} Prestige Properties. All rights reserved.</p>
    </footer>
  );
};

// Inline styles
const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '5px 0',
  // position: 'fixed',
  bottom: 0,
  width: '100%',
  marginTop: 'auto',
};

const textStyle = {
  margin: '5px 0',
};

const socialLinksContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  margin: '10px 0',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

export default Footer;
