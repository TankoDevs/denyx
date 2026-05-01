import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isShopPage = location.pathname === '/shop';

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
          <img src="/icone.svg" alt="DENYX Logo" className="logo-img" />
          <span className="logo-text">DENYX</span>
        </a>

        <div className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${!isShopPage ? 'active' : ''}`}>Home</Link>
          <Link to="/shop" className={`nav-link ${isShopPage ? 'active' : ''}`}>Shop Collection</Link>
        </div>

        <div className="nav-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            className="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
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
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Shop Collection</Link>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
          >
            Cart ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
