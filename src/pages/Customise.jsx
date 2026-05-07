import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Customise.css';

const customOptions = [
  {
    id: 'jeans',
    title: 'Bespoke Jeans',
    description: 'Custom-fitted upcycled denim jeans tailored precisely to your measurements and style preferences.',
    image: 'https://images.unsplash.com/photo-1542272604-78021b369c73?w=1200&auto=format&fit=crop'
  },
  {
    id: 'wallet-bag',
    title: 'Denim Wallet Bag',
    description: 'A unique, handcrafted wallet bag made from high-quality denim offcuts. Sustainable and stylish.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&auto=format&fit=crop'
  },
  {
    id: 'hand-bag',
    title: 'Signature Tote',
    description: 'Spacious and durable signature tote bag, upcycled from vintage denim for a timeless look.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&auto=format&fit=crop'
  }
];

const Customise = () => {
  const navigate = useNavigate();

  const handleSelect = (optionId) => {
    navigate(`/tailor-form?item=${optionId}`);
  };

  return (
    <div className="customise-page">
      <div className="container">
        <div className="customise-header text-center animate-fade-in-up">
          <span className="section-badge">Bespoke Design</span>
          <h1 className="section-title">Customise Your <span className="text-gradient">Piece</span></h1>
          <p className="section-subtitle">Choose an item to start your customisation journey with our expert tailors across Tunisia.</p>
        </div>

        <div className="options-grid">
          {customOptions.map((option) => (
            <div 
              key={option.id} 
              className="custom-option-card glass-panel animate-fade-in-up"
              onClick={() => handleSelect(option.id)}
            >
              <div className="card-image-wrapper">
                <img src={option.image} alt={option.title} />
                <div className="card-overlay">
                  <span className="overlay-text">Select Design</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="card-footer">
                  <button className="btn-premium w-100">Get Started</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customise;
