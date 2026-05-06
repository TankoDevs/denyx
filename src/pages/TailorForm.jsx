import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tailorsData, locations } from '../data/tailorsData';
import './Customise.css'; // Reuse some layout styles

const TailorForm = () => {
  const [searchParams] = useSearchParams();
  const item = searchParams.get('item');
  
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [showTailors, setShowTailors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && place) {
      setShowTailors(true);
    }
  };

  const selectedTailors = place ? tailorsData[place] : [];

  return (
    <div className="customise-page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="customise-header text-center">
          <h1>Request Customisation</h1>
          <p>Tell us who you are and where you are located so we can match you with the best tailors in Tunisia.</p>
        </div>

        {!showTailors ? (
          <form className="glass-panel animate-fade-in-up" onSubmit={handleSubmit} style={{ padding: '3rem' }}>
            <div className="login-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Location (Tunisia)</label>
                <select 
                  className="form-input"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                  style={{ 
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    width: '100%'
                  }}
                >
                  <option value="" disabled>Select your city</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc} style={{ background: '#1B3A68' }}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Selected Item</label>
                <input type="text" value={item ? item.replace('-', ' ').toUpperCase() : ''} disabled />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '1rem' }}>
                Find Tailors
              </button>
            </div>
          </form>
        ) : (
          <div className="tailors-selection animate-fade-in-up">
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Tailors available in {place}</h2>
            <div className="tailors-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {selectedTailors.map(tailor => (
                <div key={tailor.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: 'var(--color-accent-beige)' }}>{tailor.name}</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Specialty: {tailor.specialty}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{tailor.phone}</p>
                    <button className="btn btn-primary" onClick={() => alert(`Connecting you to ${tailor.name}...`)}>Contact</button>
                  </div>
                </div>
              ))}
              {selectedTailors.length === 0 && (
                <p style={{ textAlign: 'center' }}>No tailors found in this location yet. We are expanding soon!</p>
              )}
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowTailors(false)}
                style={{ marginTop: '2rem' }}
              >
                Back to Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailorForm;
