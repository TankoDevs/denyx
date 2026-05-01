import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="logo">
          <img src="/logo.svg" alt="DENYX Logo" className="logo-img" />
          <span className="logo-text">DENYX</span>
        </a>

        <div className="nav-links desktop-only">
          <a href="#features" className="nav-link">Features</a>
          <a href="#process" className="nav-link">Our Process</a>
          <a href="#products" className="nav-link">Products</a>
        </div>

        <div className="nav-actions desktop-only">
          <button className="btn btn-primary">Shop Collection</button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          <a href="#features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#process" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Our Process</a>
          <a href="#products" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
          <button className="btn btn-primary">Shop Collection</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
