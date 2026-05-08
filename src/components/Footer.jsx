import React from 'react';
import './Footer.css';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo">
            <img src="/icone.svg" alt="DENYX Logo" className="logo-img" />
            <span className="logo-text">DENYX</span>
          </Link>
          <p className="footer-bio">
            Reinventing denim for a sustainable future. Every piece tells a story of rebirth and conscious craftsmanship.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/denyx.tn" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-link" aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/customise">Customise</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">About</h4>
          <ul className="footer-links">
            <li><Link to="/about#story">Our Story</Link></li>
            <li><Link to="/about#sustainability">Sustainability</Link></li>
            <li><Link to="/about#vision">Vision</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Contact Us</Link></li>
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
