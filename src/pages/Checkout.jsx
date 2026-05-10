import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, ShieldCheck, ArrowLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const shippingFee = 7.00;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (clearCart) {
      clearCart();
    }
  };

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Your cart is empty.</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 2rem' }}>Add some items to your cart to checkout.</p>
          <button className="btn btn-premium" onClick={() => navigate('/shop')}>Return to Shop</button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="glass-panel checkout-success">
            <div className="checkout-success-icon">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for shopping sustainably. Your order has been placed successfully and is being processed.</p>
            <button className="btn btn-premium" onClick={() => navigate('/')}>Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page animate-fade-in-up">
      <div className="container">
        <button 
          className="btn btn-ghost" 
          onClick={() => navigate(-1)}
          style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
          Back
        </button>

        <div className="checkout-grid">
          {/* Left Column - Form */}
          <div className="checkout-form-container glass-panel" style={{ padding: '2.5rem' }}>
            <h2 className="checkout-section-title">Shipping & Payment</h2>
            <form onSubmit={handleSubmit}>
              <div className="checkout-form-group">
                <label className="checkout-label">Email Address</label>
                <input type="email" required className="checkout-input" placeholder="you@example.com" />
              </div>
              
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label className="checkout-label">First Name</label>
                  <input type="text" required className="checkout-input" placeholder="First Name" />
                </div>
                <div className="checkout-form-group">
                  <label className="checkout-label">Last Name</label>
                  <input type="text" required className="checkout-input" placeholder="Last Name" />
                </div>
              </div>

              <div className="checkout-form-group">
                <label className="checkout-label">Address</label>
                <input type="text" required className="checkout-input" placeholder="Street Address" />
              </div>

              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label className="checkout-label">City</label>
                  <input type="text" required className="checkout-input" placeholder="City" />
                </div>
                <div className="checkout-form-group">
                  <label className="checkout-label">Phone</label>
                  <input type="tel" required className="checkout-input" placeholder="Phone Number" />
                </div>
              </div>

              <div className="checkout-form-group" style={{ marginTop: '2rem' }}>
                <h3 className="checkout-section-title" style={{ fontSize: '1.25rem' }}>Payment Method</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="checkout-input" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--color-accent-beige)', background: 'rgba(209, 189, 164, 0.05)' }}>
                    <input type="radio" name="payment" id="cod" defaultChecked style={{ accentColor: 'var(--color-accent-beige)' }} />
                    <label htmlFor="cod" style={{ color: 'white', fontWeight: 600, cursor: 'pointer' }}>Cash on Delivery</label>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} /> Safe and secure payment upon receiving your items.
                </p>
              </div>

              <button type="submit" className="btn btn-premium w-100" style={{ marginTop: '2rem' }}>
                Place Order - {finalTotal.toFixed(2)} TND
              </button>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="checkout-summary glass-panel" style={{ padding: '2.5rem', position: 'sticky', top: '7rem' }}>
            <h2 className="checkout-section-title">Order Summary</h2>
            
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-summary-item">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="checkout-summary-price">
                    {(item.priceValue * item.quantity).toFixed(2)} TND
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>{cartTotal.toFixed(2)} TND</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>{shippingFee.toFixed(2)} TND</span>
              </div>
              <div className="checkout-total-row final">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} TND</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
