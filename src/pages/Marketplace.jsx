import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag, Camera, Loader2 } from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';
import { ModernList, ModernListItem } from '../components/ui/ModernList';
import './Marketplace.css';

const initialMarketplaceItems = [
  {
    id: 'm1',
    name: 'Vintage 90s Straight Jeans',
    brand: 'Levi\'s',
    size: '32x32',
    description: 'Classic vintage 501s from the 90s. Some natural fading around the knees, but the denim is thick and durable. Perfect for upcycling or wearing as-is.',
    phone: '55 123 456',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
    seller: 'Amine',
    price: '35 TND',
    priceValue: 35
  },
  {
    id: 'm2',
    name: 'Light Wash Denim Jacket',
    brand: 'Zara',
    size: 'Medium',
    description: 'Wore these only a few times. Really cool fit, light wash. Selling because they don\'t fit me anymore.',
    phone: '22 987 654',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&auto=format&fit=crop',
    seller: 'Sarra',
    price: '45 TND',
    priceValue: 45
  },
  {
    id: 'm3',
    name: 'Distressed Black Jeans',
    brand: 'Pull & Bear',
    size: '30x30',
    description: 'Great distressed details and very comfortable stretch denim. Ready to be re-homed.',
    phone: '99 444 333',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop',
    seller: 'Youssef',
    price: '25 TND',
    priceValue: 25
  }
];

const Marketplace = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('denyx_marketplace_items_v3');
    return savedItems ? JSON.parse(savedItems) : initialMarketplaceItems;
  });

  const [showSellForm, setShowSellForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { addToCart } = useCart();
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('denyx_marketplace_items_v3', JSON.stringify(items));
  }, [items]);

  // Form State
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    brand: '',
    size: '',
    description: '',
    phone: '',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop',
    imageFile: null,
    imagePreview: null
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({
        ...newItem,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handlePostItem = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = newItem.image;
      if (newItem.imageFile) {
        finalImageUrl = await uploadImage(newItem.imageFile);
      }

      const itemToAdd = {
        name: newItem.name,
        condition: newItem.condition,
        brand: newItem.brand,
        size: newItem.size,
        description: newItem.description,
        phone: newItem.phone,
        image: finalImageUrl,
        id: 'm' + Date.now(),
        seller: 'Me',
        price: `${newItem.price} TND`,
        priceValue: parseInt(newItem.price)
      };

      setItems([itemToAdd, ...items]);
      setShowSellForm(false);
      setNewItem({
        name: '', price: '', brand: '', size: '', description: '', phone: '', condition: 'Good',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop',
        imageFile: null, imagePreview: null
      });
    } catch (error) {
      alert('Failed to upload image. Please check your Cloudinary settings.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="marketplace-page">
      <div className="container">
        <div className="marketplace-header animate-fade-in-up">
          <div>
            <span className="section-badge">Community First</span>
            <h1>DENYX <span className="text-gradient">Marketplace</span></h1>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0' }}>Buy and sell authentic pre-loved denim within the DENYX community.</p>
          </div>
          <button className="btn-premium" onClick={() => setShowSellForm(!showSellForm)}>
            <Plus size={20} style={{ marginRight: '8px' }} /> Post Your Denim
          </button>
        </div>

        {showSellForm && (
          <div className="sell-form-container glass-panel animate-fade-in-up">
            <h3>Post Your Old Jeans</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Fill in all the details below so buyers know exactly what you're selling.</p>
            <form onSubmit={handlePostItem} className="sell-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage 90s Jeans"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Levi's, Zara..."
                    value={newItem.brand}
                    onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 32x32, Medium..."
                    value={newItem.size}
                    onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price (TND)</label>
                  <input
                    type="number"
                    placeholder="75"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select
                    value={newItem.condition}
                    onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                  >
                    <option value="Like New">Like New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 55 123 456"
                    value={newItem.phone}
                    onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Description</label>
                <textarea
                  placeholder="Describe your jeans (e.g. fit, any wear and tear, material...)"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label>Upload Photo</label>
                <div
                  className="photo-upload-placeholder"
                  onClick={() => fileInputRef.current.click()}
                  style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', height: '120px' }}
                >
                  {newItem.imagePreview ? (
                    <img src={newItem.imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <Camera size={24} />
                      <span>Click to select photo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowSellForm(false)} disabled={isUploading}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isUploading}>
                  {isUploading ? <><Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} /> Posting...</> : 'Post Item'}
                </button>
              </div>
            </form>
          </div>
        )}

        <ModernList layout="grid">
          {items.map((item) => (
            <ModernListItem key={item.id} variant="product">
              <div className="modern-product-image-wrapper">
                <img src={item.image} alt={item.name} className="modern-product-image" />
                <span className="condition-badge" style={{
                  position: 'absolute', top: '10px', right: '10px',
                  padding: '4px 10px', borderRadius: '8px',
                  background: 'rgba(27, 58, 104, 0.8)', color: 'white', fontSize: '0.7rem'
                }}>
                  {item.condition}
                </span>
                <div className="modern-product-overlay">
                  <button className="btn-premium" onClick={() => addToCart(item)}>
                    <ShoppingBag size={18} style={{ marginRight: '8px' }} /> Quick Add
                  </button>
                </div>
              </div>
              <div className="modern-product-info">
                <span className="modern-product-category">Sold by {item.seller}</span>
                <h3 className="modern-product-name">{item.name}</h3>
                <div className="modern-product-footer">
                  <span className="modern-product-price">{item.price}</span>
                  <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </ModernListItem>
          ))}
        </ModernList>

      </div>
    </div>
  );
};

export default Marketplace;
