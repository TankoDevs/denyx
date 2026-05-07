import React from 'react';
import { ModernList, ModernListItem } from './ui/ModernList';
import './Products.css';

const productsData = [
  {
    id: 1,
    name: 'The Essential Tote',
    category: 'Bags',
    price: '85 TND',
    image: 'https://loremflickr.com/800/800/denim,bag?lock=41'
  },
  {
    id: 2,
    name: 'Everyday Crossbody',
    category: 'Accessories',
    price: '65 TND',
    image: 'https://loremflickr.com/800/800/denim,accessories?lock=42'
  },
  {
    id: 3,
    name: 'Tech Sleeve Pro',
    category: 'Tech Accessories',
    price: '45 TND',
    image: 'https://loremflickr.com/800/800/denim,laptop?lock=43'
  },
  {
    id: 4,
    name: 'Minimalist Pouch',
    category: 'Accessories',
    price: '35 TND',
    image: 'https://loremflickr.com/800/800/denim,pouch?lock=44'
  }
];

const Products = () => {
  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="features-header text-center">
          <h2 className="section-title">Latest <span className="text-gradient">Collection</span></h2>
          <p className="section-subtitle">Premium upcycled denim, designed for modern utility.</p>
        </div>

        <ModernList layout="grid">
          {productsData.map((product) => (
            <ModernListItem key={product.id} variant="product">
              <div className="modern-product-image-wrapper">
                <img src={product.image} alt={product.name} className="modern-product-image" loading="lazy" />
                <div className="modern-product-overlay">
                  <button className="btn-premium">Quick View</button>
                </div>
              </div>
              <div className="modern-product-info">
                <span className="modern-product-category">{product.category}</span>
                <h3 className="modern-product-name">{product.name}</h3>
                <div className="modern-product-footer">
                  <span className="modern-product-price">{product.price}</span>
                  <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Details</button>
                </div>
              </div>
            </ModernListItem>
          ))}
        </ModernList>
        
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button className="btn btn-ghost">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default Products;
