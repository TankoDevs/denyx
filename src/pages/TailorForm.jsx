import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tailorsData, locations } from '../data/tailorsData';
import { ModernList, ModernListItem, EmptyState } from '../components/ui/ModernList';
import { Search, Phone, MessageCircle, X } from 'lucide-react';
import './Customise.css';

const itemDetails = {
  'jeans': { title: 'Bespoke Jeans', desc: 'Custom upcycled denim' },
  'wallet-bag': { title: 'Denim Wallet Bag', desc: 'Handcrafted sustainable wallet' },
  'hand-bag': { title: 'Signature Tote', desc: 'Vintage upcycled tote bag' },
  'own-design': { title: 'Your Custom Design', desc: 'A unique piece crafted just for you' }
};

const TailorForm = () => {
  const [searchParams] = useSearchParams();
  const item = searchParams.get('item');
  const photoBase64 = searchParams.get('photo');
  
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [showTailors, setShowTailors] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && place) {
      setShowTailors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContact = (tailor) => {
    setSelectedTailor(tailor);
  };

  const closeContactModal = () => {
    setSelectedTailor(null);
  };

  const selectedTailors = place ? tailorsData[place] : [];
  const currentItem = item ? itemDetails[item] : null;

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
            
            {/* Display Selected Item and Photo if available */}
            {(currentItem || photoBase64) && (
              <div className="selected-item-card">
                {photoBase64 ? (
                  <img src={photoBase64} alt="Your inspiration" className="selected-item-image" />
                ) : (
                  <div className="selected-item-image" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2rem' }}>👖</span>
                  </div>
                )}
                <div className="selected-item-details">
                  <span className="selected-item-label">Your Project</span>
                  <h3 className="selected-item-title">{currentItem?.title || 'Custom Piece'}</h3>
                  <p className="selected-item-desc">
                    {photoBase64 ? 'Reference photo provided' : currentItem?.desc}
                  </p>
                </div>
              </div>
            )}

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
                
                <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '2rem', padding: '1.25rem', fontSize: '1.1rem' }}>
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
                        <span className="modern-row-subtitle">Verified Professional</span>
                      </div>
                    </div>
                    <div className="modern-row-actions">
                      <button className="btn-premium" onClick={() => handleContact(tailor)}>
                        Contact Tailor
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

      {/* Contact Tailor Modal */}
      {selectedTailor && (
        <div className="contact-modal-overlay animate-fade-in" onClick={closeContactModal}>
          <div className="contact-modal animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="contact-modal-header">
              <div>
                <h3>Contact Tailor</h3>
                <p>Connect directly to discuss your custom project</p>
              </div>
              <button className="contact-modal-close" onClick={closeContactModal}>
                <X size={24} />
              </button>
            </div>
            <div className="contact-modal-body">
              <div className="contact-tailor-info">
                <div className="contact-tailor-avatar">
                  {selectedTailor.name.charAt(0)}
                </div>
                <div className="contact-tailor-details">
                  <h4>{selectedTailor.name}</h4>
                  <p>{selectedTailor.specialty}</p>
                </div>
              </div>

              {photoBase64 && (
                <div className="upload-success-bar" style={{ marginBottom: '2rem', background: 'rgba(209, 189, 164, 0.1)', color: 'var(--color-accent-beige)' }}>
                  <span className="upload-success-dot" style={{ background: 'var(--color-accent-beige)', boxShadow: '0 0 10px var(--color-accent-beige)' }} />
                  <span>Your inspiration photo will be shared with the tailor.</span>
                </div>
              )}

              <div className="contact-options">
                <a 
                  href={`https://wa.me/${selectedTailor.phone.replace(/[^0-9]/g, '')}?text=Hi! I found you on Denyx and I'm interested in a custom ${item ? item.replace('-', ' ') : 'piece'}.`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-btn btn-whatsapp"
                >
                  <MessageCircle size={20} />
                  Message on WhatsApp
                </a>
                <a href={`tel:${selectedTailor.phone}`} className="contact-btn btn-phone">
                  <Phone size={20} />
                  Call {selectedTailor.phone}
                </a>
              </div>

              <p className="contact-disclaimer">
                By contacting the tailor, you agree to Denyx's terms of service. Transactions and arrangements are handled directly between you and the tailor.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TailorForm;
