import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag, Camera, Loader2 } from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';
import './Marketplace.css';

const initialMarketplaceItems = [
  // ... existing initial items
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
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=600&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=600&auto=format&fit=crop',
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
        <div className="marketplace-header">
          <div>
            <h1>Community <span className="text-gradient">Marketplace</span></h1>
            <p>Buy and sell used denim within the DENYX community.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowSellForm(!showSellForm)}>
            <Plus size={20} style={{ marginRight: '8px' }} /> Sell Your Jeans
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
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Price (TND)</label>
                  <input 
                    type="number" 
                    placeholder="75" 
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select 
                    value={newItem.condition}
                    onChange={(e) => setNewItem({...newItem, condition: e.target.value})}
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

        <div className="marketplace-grid">
          {items.map((item) => (
            <div key={item.id} className="marketplace-card glass-panel animate-fade-in-up">
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <span className="condition-badge">{item.condition}</span>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <span className="price">{item.price}</span>
                </div>
                <p className="seller">Sold by <strong>{item.seller}</strong></p>
                <button className="btn btn-ghost w-100" onClick={() => addToCart(item)}>
                  <ShoppingBag size={18} style={{ marginRight: '8px' }} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
