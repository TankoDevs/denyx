import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ModernList, ModernListItem, EmptyState } from './ui/ModernList';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar glass-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <EmptyState 
              icon={ShoppingBag} 
              title="Your cart is empty" 
              message="Looks like you haven't added anything to your cart yet."
            >
              <button 
                className="btn btn-primary" 
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '1rem' }}
              >
                Continue Shopping
              </button>
            </EmptyState>
          ) : (
            <ModernList className="cart-items">
              {cartItems.map((item) => (
                <ModernListItem key={item.id} variant="cart">
                  <img src={item.image} alt={item.name} className="modern-cart-img" />
                  <div className="modern-cart-details">
                    <div className="modern-cart-header">
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
                      <p className="cart-item-price" style={{ margin: 0, fontWeight: 700 }}>{item.price}</p>
                    </div>
                    
                    <div className="modern-cart-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </ModernListItem>
              ))}
            </ModernList>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>{cartTotal.toFixed(2)} TND</span>
            </div>
            <p className="cart-taxes-note">Taxes and shipping calculated at checkout</p>
            <button className="btn btn-primary w-100" onClick={() => alert("Checkout flow coming soon!")}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
