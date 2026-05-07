import React, { useState } from 'react';
import { RefreshCcw, Package, CreditCard } from 'lucide-react';
import { ModernList, ModernListItem } from './ui/ModernList';
import './TradeIn.css';

const TradeIn = () => {
  const [condition, setCondition] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);

  const handleConditionChange = (e) => {
    const val = e.target.value;
    setCondition(val);
    if (val === 'excellent') setEstimatedValue(15);
    else if (val === 'good') setEstimatedValue(10);
    else if (val === 'worn') setEstimatedValue(5);
    else setEstimatedValue(0);
  };

  return (
    <section id="trade-in" className="section trade-in-section">
      <div className="container">
        <div className="trade-in-wrapper glass-panel animate-fade-in-up">
          
          <div className="trade-in-content">
            <span className="section-badge">Circular Fashion</span>
            <h2 className="trade-in-title">Trade in your <span className="text-gradient">old denim.</span></h2>
            <p className="trade-in-description">
              Don't let your old jeans sit in the closet or end up in a landfill. 
              Send them to us, and we'll transform them into something new. 
              In return, you get store credit towards your next DENYX purchase.
            </p>

            <ModernList className="trade-in-steps" stagger={0.15}>
              <ModernListItem variant="row" className="step-item" style={{ background: 'transparent', border: 'none', padding: '0.75rem 0' }}>
                <div className="step-icon-wrapper" style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: 'rgba(209, 189, 164, 0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', marginRight: '1.25rem',
                  color: 'var(--color-accent-beige)'
                }}><RefreshCcw size={22} /></div>
                <div className="step-text">
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>1. Get an Estimate</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Tell us about the condition of your denim.</p>
                </div>
              </ModernListItem>
              <ModernListItem variant="row" className="step-item" style={{ background: 'transparent', border: 'none', padding: '0.75rem 0' }}>
                <div className="step-icon-wrapper" style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: 'rgba(209, 189, 164, 0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', marginRight: '1.25rem',
                  color: 'var(--color-accent-beige)'
                }}><Package size={22} /></div>
                <div className="step-text">
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>2. Ship for Free</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>We provide a prepaid shipping label for you.</p>
                </div>
              </ModernListItem>
              <ModernListItem variant="row" className="step-item" style={{ background: 'transparent', border: 'none', padding: '0.75rem 0' }}>
                <div className="step-icon-wrapper" style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: 'rgba(209, 189, 164, 0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', marginRight: '1.25rem',
                  color: 'var(--color-accent-beige)'
                }}><CreditCard size={22} /></div>
                <div className="step-text">
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>3. Get Credit</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Receive store credit instantly upon review.</p>
                </div>
              </ModernListItem>
            </ModernList>
          </div>

          <div className="trade-in-calculator glass-panel">
            <div className="calc-header">
              <h3>Value Estimator</h3>
              <p className="calc-subtitle">Find out how much your old denim is worth.</p>
            </div>
            
            <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Item Type</label>
                <div className="select-wrapper">
                  <select className="premium-input premium-select" defaultValue="jeans">
                    <option value="jeans">Denim Jeans</option>
                    <option value="jacket">Denim Jacket</option>
                    <option value="shorts">Denim Shorts</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Condition</label>
                <div className="select-wrapper">
                  <select className="premium-input premium-select" value={condition} onChange={handleConditionChange}>
                    <option value="" disabled>Select condition...</option>
                    <option value="excellent">Excellent (Barely Worn)</option>
                    <option value="good">Good (Normal Wear)</option>
                    <option value="worn">Worn Out (Holes, Faded)</option>
                  </select>
                </div>
              </div>

              <div className="estimate-result glass-panel animate-pulse-subtle">
                <span className="estimate-label">Estimated Store Credit</span>
                <span className="estimate-amount">{estimatedValue} <span className="currency">TND</span></span>
              </div>

              <button className="btn-premium w-100" disabled={!condition}>
                Start Trade-In Process
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TradeIn;
