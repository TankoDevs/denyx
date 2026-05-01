import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-animated"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <span className="hero-badge">Waste Less.Wear More</span>
          <h1 className="hero-title">
            Reinventing <span className="text-gradient">Denim</span>
          </h1>
          <p className="hero-subtitle">
            From waste to wearable. Sustainable fashion powered by innovation. 
            Experience the luxury of upcycled denim, designed for the modern world.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Explore Collection <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/shop" className="btn btn-ghost">Shop Collection</Link>
          </div>
        </div>
      </div>
      <div className="hero-gradient-overlay"></div>
    </section>
  );
};

export default Hero;
