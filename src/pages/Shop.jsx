import React from 'react';
import { useCart } from '../context/CartContext';
import '../components/Products.css'; // Reuse product grid styling

// We will use more specific prices to calculate cart totals easily
const shopProducts = [
  {
    id: 'p1',
    name: 'The Essential Tote',
    category: 'Bags',
    price: '$85',
    priceValue: 85,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'p2',
    name: 'Everyday Crossbody',
    category: 'Accessories',
    price: '$65',
    priceValue: 65,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'p3',
    name: 'Tech Sleeve Pro',
    category: 'Tech Accessories',
    price: '$45',
    priceValue: 45,
    image: 'https://images.unsplash.com/photo-1621570274151-6789f2142273?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Minimalist Pouch',
    category: 'Accessories',
    price: '$35',
    priceValue: 35,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'p5',
    name: 'Denim Weekender Bag',
    category: 'Bags',
    price: '$120',
    priceValue: 120,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'p6',
    name: 'Classic Cardholder',
    category: 'Accessories',
    price: '$25',
    priceValue: 25,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop'
  }
];

const Shop = () => {
  const { addToCart } = useCart();

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section products">
        <div className="container">
          <div className="features-header text-center" style={{ marginBottom: '4rem' }}>
            <h1 className="section-title">Shop Collection</h1>
            <p className="section-subtitle">Premium upcycled denim, designed for modern utility.</p>
          </div>

          <div className="products-grid">
            {shopProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <div className="product-overlay">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
