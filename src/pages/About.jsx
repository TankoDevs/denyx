import React, { useEffect } from 'react';
import { ArrowRight, Recycle, Leaf, Diamond } from 'lucide-react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* ── Hero Section ── */}
      <section className="about-hero" id="story">
        <div className="container">
          <div className="about-hero-content animate-fade-in-up">
            <span className="section-badge">Our Story</span>
            <h1 className="section-title">
              Giving Old Denim a <span className="text-gradient">Second Life</span>
            </h1>
            <p className="section-subtitle">
              DENYX is a sustainable fashion startup focused on transforming used jeans into modern, premium fashion products through recycling, redesign, and creative craftsmanship.
            </p>
          </div>
        </div>
        <div className="about-hero-glow"></div>
      </section>

      {/* ── Vision Section ── */}
      <section className="about-vision" id="vision">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-text glass-panel animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="vision-icon">
                <Leaf size={32} />
              </div>
              <h2>Our Vision</h2>
              <p>
                We are creating a future where fashion waste becomes premium wearable products instead of pollution. 
                DENYX is not fast fashion. It is <strong>purposeful fashion</strong>.
              </p>
            </div>
            
            <div className="vision-text glass-panel animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="vision-icon">
                <Diamond size={32} />
              </div>
              <h2>Our Identity</h2>
              <ul className="identity-list">
                <li>Modern & Minimal</li>
                <li>Innovative & Eco-conscious</li>
                <li>Premium & Youth-oriented</li>
              </ul>
              <p className="mt-4 text-muted">
                Our aesthetic direction combines denim culture, tech startup visuals, minimal luxury branding, and a circular fashion philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transformation Section ── */}
      <section className="about-transformation">
        <div className="container">
          <div className="transformation-header text-center animate-fade-in-up">
            <h2>The <span className="text-gradient">Transformation</span></h2>
            <p className="section-subtitle">From forgotten garments to premium pieces.</p>
          </div>

          <div className="transformation-flow">
            <div className="flow-step glass-panel animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="step-number">01</div>
              <h3>Old Jeans</h3>
              <p>We collect worn-out, unwanted denim that would otherwise end up in landfills.</p>
            </div>
            
            <div className="flow-arrow animate-fade-in">
              <ArrowRight size={32} className="text-accent-beige" />
            </div>

            <div className="flow-step glass-panel animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="step-number">02</div>
              <h3>Recycled Materials</h3>
              <p>The denim is carefully dismantled, cleaned, and prepared for its next lifecycle.</p>
            </div>

            <div className="flow-arrow animate-fade-in">
              <ArrowRight size={32} className="text-accent-beige" />
            </div>

            <div className="flow-step glass-panel animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="step-number">03</div>
              <h3>Modern Products</h3>
              <p>Expert tailors craft the materials into high-end, contemporary fashion pieces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="about-values" id="sustainability">
        <div className="container">
          <div className="values-container glass-panel animate-fade-in-up">
            <div className="values-header">
              <Recycle size={48} className="text-accent-beige mb-4" />
              <h2>What We Stand For</h2>
            </div>
            <div className="values-grid">
              <div className="value-item">
                <h4>Trust</h4>
                <p>Complete transparency in our supply chain and sourcing.</p>
              </div>
              <div className="value-item">
                <h4>Innovation</h4>
                <p>Pushing the boundaries of circular fashion technology.</p>
              </div>
              <div className="value-item">
                <h4>Sustainability</h4>
                <p>Zero waste commitment in every step of our process.</p>
              </div>
              <div className="value-item">
                <h4>Style</h4>
                <p>Uncompromising aesthetics for the modern wardrobe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
