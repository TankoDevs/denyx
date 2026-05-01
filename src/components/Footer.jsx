import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="/" className="logo footer-logo">
            <img src="/logo.svg" alt="DENYX Logo" className="logo-img" />
            <span className="logo-text">DENYX</span>
          </a>
          <p className="footer-bio">
            Reinventing denim for a sustainable future. Every piece tells a story of rebirth and conscious craftsmanship.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link">IG</a>
            <a href="#" className="social-link">TW</a>
            <a href="#" className="social-link">FB</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><a href="#">All Products</a></li>
            <li><a href="#">Bags & Totes</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">About</h4>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Materials</a></li>
            <li><a href="#">Journal</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Care Guide</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">&copy; {new Date().getFullYear()} DENYX. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
