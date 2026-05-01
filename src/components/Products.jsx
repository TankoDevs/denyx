import React from 'react';
import './Products.css';

// Using placeholders for now. Real ones would be the denim bags/pouches.
const productsData = [
  {
    id: 1,
    name: 'The Essential Tote',
    category: 'Bags',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Everyday Crossbody',
    category: 'Accessories',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Tech Sleeve Pro',
    category: 'Tech Accessories',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1621570274151-6789f2142273?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Minimalist Pouch',
    category: 'Accessories',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop'
  }
];

const Products = () => {
  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="features-header text-center">
          <h2 className="section-title">Latest Collection</h2>
          <p className="section-subtitle">Premium upcycled denim, designed for modern utility.</p>
        </div>

        <div className="products-grid">
          {productsData.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <div className="product-overlay">
                  <button className="btn btn-primary">Quick View</button>
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
        
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button className="btn btn-ghost">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default Products;
