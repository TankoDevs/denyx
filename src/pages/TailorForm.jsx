import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tailorsData, locations } from '../data/tailorsData';
import { ModernList, ModernListItem, EmptyState } from '../components/ui/ModernList';
import { Search } from 'lucide-react';
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
        <div className="customise-header text-center animate-fade-in-up">
          <span className="section-badge">Service Locator</span>
          <h1 className="section-title">Request <span className="text-gradient">Customisation</span></h1>
          <p className="section-subtitle">Tell us who you are and where you are located so we can match you with the best tailors in Tunisia.</p>
        </div>

        {/* Progress Indicator */}
        <div className="form-progress-wrapper animate-fade-in-up">
          <div className={`progress-step ${!showTailors ? 'active' : 'completed'}`}>
            <span className="step-num">1</span>
            <span className="step-label">Details</span>
          </div>
          <div className="progress-line">
            <div className="line-fill" style={{ width: showTailors ? '100%' : '0%' }}></div>
          </div>
          <div className={`progress-step ${showTailors ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Match</span>
          </div>
        </div>

        {!showTailors ? (
          <div className="form-container glass-panel animate-fade-in-up">
            <form onSubmit={handleSubmit}>
              <div className="login-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="premium-input"
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location (Tunisia)</label>
                  <div className="select-wrapper">
                    <select 
                      className="premium-input premium-select"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select your city</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Selected Item</label>
                  <input 
                    type="text" 
                    className="premium-input disabled-input"
                    value={item ? item.replace('-', ' ').toUpperCase() : ''} 
                    disabled 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '2rem', padding: '1rem' }}>
                  Find Available Tailors
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="tailors-selection animate-fade-in-up">
            <div className="results-header text-center" style={{ marginBottom: '3rem' }}>
              <h2>Expert Tailors in <span className="text-gradient">{place}</span></h2>
              <p>Hand-picked professionals specialized in denim upcycling.</p>
            </div>
            
            {selectedTailors.length === 0 ? (
              <EmptyState 
                icon={Search} 
                title="No tailors found" 
                message="We haven't expanded to this location yet. Check back soon!"
              />
            ) : (
              <ModernList>
                {selectedTailors.map(tailor => (
                  <ModernListItem key={tailor.id} variant="row">
                    <div className="modern-row-avatar">
                      {tailor.name.charAt(0)}
                    </div>
                    <div className="modern-row-content">
                      <h3 className="modern-row-title">{tailor.name}</h3>
                      <div className="modern-row-meta">
                        <span className="modern-badge">{tailor.specialty}</span>
                        <span className="modern-row-subtitle">{tailor.phone}</span>
                      </div>
                    </div>
                    <div className="modern-row-actions">
                      <button className="btn-premium" onClick={() => alert(`Connecting you to ${tailor.name}...`)}>
                        Book Now
                      </button>
                    </div>
                  </ModernListItem>
                ))}
              </ModernList>
            )}
            
            <div className="text-center" style={{ marginTop: '3rem' }}>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowTailors(false)}
              >
                Change Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailorForm;
