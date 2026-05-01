import React, { useState } from 'react';
import { RefreshCcw, Package, CreditCard } from 'lucide-react';
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
    <section id="trade-in" className="section trade-in">
      <div className="container">
        <div className="trade-in-wrapper glass-panel">
          
          <div className="trade-in-content">
            <span className="trade-in-badge">Circular Fashion</span>
            <h2 className="trade-in-title">Trade in your old denim.</h2>
            <p className="trade-in-description">
              Don't let your old jeans sit in the closet or end up in a landfill. 
              Send them to us, and we'll transform them into something new. 
              In return, you get store credit towards your next DENYX purchase.
            </p>

            <div className="trade-in-steps">
              <div className="step-item">
                <div className="step-icon"><RefreshCcw size={20} /></div>
                <div>
                  <h4>1. Get an Estimate</h4>
                  <p>Tell us about the condition.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon"><Package size={20} /></div>
                <div>
                  <h4>2. Ship for Free</h4>
                  <p>We provide a prepaid shipping label.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon"><CreditCard size={20} /></div>
                <div>
                  <h4>3. Get Credit</h4>
                  <p>Receive store credit instantly upon review.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="trade-in-calculator glass-panel">
            <h3>Value Estimator</h3>
            <p className="calc-subtitle">Find out how much your old denim is worth.</p>
            
            <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Item Type</label>
                <select className="form-input" defaultValue="jeans">
                  <option value="jeans">Denim Jeans</option>
                  <option value="jacket">Denim Jacket</option>
                  <option value="shorts">Denim Shorts</option>
                </select>
              </div>

              <div className="form-group">
                <label>Condition</label>
                <select className="form-input" value={condition} onChange={handleConditionChange}>
                  <option value="" disabled>Select condition...</option>
                  <option value="excellent">Excellent (Barely Worn)</option>
                  <option value="good">Good (Normal Wear)</option>
                  <option value="worn">Worn Out (Holes, Faded)</option>
                </select>
              </div>

              <div className="estimate-result">
                <span>Estimated Store Credit:</span>
                <span className="estimate-amount">{estimatedValue} TND</span>
              </div>

              <button className="btn btn-primary w-100" disabled={!condition}>
                Start Trade-In
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TradeIn;
