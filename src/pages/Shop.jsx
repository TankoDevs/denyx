import React from 'react';
import { useCart } from '../context/CartContext';
import { ModernList, ModernListItem } from '../components/ui/ModernList';
import { ShoppingBag } from 'lucide-react';
import '../components/Products.css'; // Reuse product grid styling

const shopProducts = [
  {
    id: 'p1',
    name: 'Vintage Straight Leg',
    category: 'Jeans',
    price: '185 TND',
    priceValue: 185,
    image: 'https://images.unsplash.com/photo-1542272604-78021b369c73?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p2',
    name: 'Classic Indigo Jacket',
    category: 'Jackets',
    price: '220 TND',
    priceValue: 220,
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p3',
    name: 'Faded Slim Fit',
    category: 'Jeans',
    price: '160 TND',
    priceValue: 160,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Distressed Denim',
    category: 'Jeans',
    price: '175 TND',
    priceValue: 175,
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p5',
    name: 'Upcycled Patchwork',
    category: 'Jeans',
    price: '240 TND',
    priceValue: 240,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p6',
    name: 'Denim Overshirt',
    category: 'Jackets',
    price: '190 TND',
    priceValue: 190,
    image: 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=800&auto=format&fit=crop'
  }
];

const Shop = () => {
  const { addToCart } = useCart();

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section products">
        <div className="container">
          <div className="features-header text-center" style={{ marginBottom: '4rem' }}>
            <h1 className="section-title">Shop <span className="text-gradient">Collection</span></h1>
            <p className="section-subtitle">Premium upcycled denim, designed for modern utility.</p>
          </div>

          <ModernList layout="grid">
            {shopProducts.map((product) => (
              <ModernListItem key={product.id} variant="product">
                <div className="modern-product-image-wrapper">
                  <img src={product.image} alt={product.name} className="modern-product-image" loading="lazy" />
                  <div className="modern-product-overlay">
                    <button 
                      className="btn-premium" 
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={18} style={{ marginRight: '8px' }} /> Quick Add
                    </button>
                  </div>
                </div>
                <div className="modern-product-info">
                  <span className="modern-product-category">{product.category}</span>
                  <h3 className="modern-product-name">{product.name}</h3>
                  <div className="modern-product-footer">
                    <span className="modern-product-price">{product.price}</span>
                    <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </ModernListItem>
            ))}
          </ModernList>
        </div>
      </section>
    </div>
  );
};

export default Shop;
