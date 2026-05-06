import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Customise.css';

const customOptions = [
  {
    id: 'jeans',
    title: 'Jeans',
    description: 'Custom fit upcycled denim jeans.',
    image: 'https://images.unsplash.com/photo-1542272604-78021b369c73?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wallet-bag',
    title: 'Jeans Wallet Bag',
    description: 'Unique wallet bag crafted from denim scraps.',
    image: 'https://images.unsplash.com/photo-1544816153-199d88248314?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hand-bag',
    title: 'Hand Bag',
    description: 'Spacious and durable upcycled denim hand bag.',
    image: 'https://images.unsplash.com/photo-1584917469897-47469b7819b0?q=80&w=600&auto=format&fit=crop'
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
        <div className="customise-header text-center">
          <h1>Customise Your Piece</h1>
          <p>Choose an item to start your customisation journey with our expert tailors.</p>
        </div>

        <div className="options-grid">
          {customOptions.map((option) => (
            <div 
              key={option.id} 
              className="option-card glass-panel animate-fade-in-up"
              onClick={() => handleSelect(option.id)}
            >
              <div className="option-image">
                <img src={option.image} alt={option.title} />
              </div>
              <div className="option-info">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <button className="btn btn-primary">Select Item</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customise;
