import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-container glass-panel">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Wear the Future?</h2>
            <p className="cta-description">
              Join the movement towards sustainable fashion. Our limited edition pieces sell out fast.
            </p>
            <div className="cta-actions">
              <Link to="/shop" className="btn btn-primary cta-btn">Shop the Collection</Link>
              <Link to="/shop" className="btn btn-ghost cta-btn">Explore Collection</Link>
            </div>
          </div>
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
