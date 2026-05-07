import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag, Camera, Loader2 } from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';
import { ModernList, ModernListItem } from '../components/ui/ModernList';
import './Marketplace.css';

const initialMarketplaceItems = [
  {
    id: 'm1',
    name: 'Vintage 501 Levi\'s',
    condition: 'Excellent',
    image: 'https://loremflickr.com/800/800/vintage,jeans?lock=21',
    seller: 'Amine',
    price: '25 TND',
    priceValue: 25
  },
  {
    id: 'm2',
    name: 'Denim Trucker Jacket',
    condition: 'Like New',
    image: 'https://loremflickr.com/800/800/denim,jacket?lock=22',
    seller: 'Sarra',
    price: '50 TND',
    priceValue: 50
  },
  {
    id: 'm3',
    name: 'High-Waisted Shorts',
    condition: 'Good',
    image: 'https://loremflickr.com/800/800/denim,shorts?lock=23',
    seller: 'Youssef',
    price: '30 TND',
    priceValue: 30
  },
  {
    id: 'm4',
    name: 'Denim Mini Skirt',
    condition: 'Excellent',
    image: 'https://loremflickr.com/800/800/denim,skirt?lock=24',
    seller: 'Meryem',
    price: '40 TND',
    priceValue: 40
  }
];

const Marketplace = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('denyx_marketplace_items');
    return savedItems ? JSON.parse(savedItems) : initialMarketplaceItems;
  });

  const [showSellForm, setShowSellForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { addToCart } = useCart();
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('denyx_marketplace_items', JSON.stringify(items));
  }, [items]);

  // Form State
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    condition: 'Good',
    image: 'https://loremflickr.com/800/800/denim,clothing?lock=25',
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
        image: finalImageUrl,
        id: 'm' + Date.now(),
        seller: 'Me',
        price: `${newItem.price} TND`,
        priceValue: parseInt(newItem.price)
      };

      setItems([itemToAdd, ...items]);
      setShowSellForm(false);
      setNewItem({
        name: '', price: '', condition: 'Good',
        image: 'https://loremflickr.com/800/800/denim,clothing?lock=25',
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
            <h3>Post Your Jeans</h3>
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
                  <label>Upload Photo</label>
                  <div
                    className="photo-upload-placeholder"
                    onClick={() => fileInputRef.current.click()}
                    style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
                  >
                    {newItem.imagePreview ? (
                      <img src={newItem.imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <Camera size={24} />
                        <span>Click to select photo</span>
                      </>
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
