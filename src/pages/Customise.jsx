import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ImagePlus, X, Sparkles } from 'lucide-react';
import './Customise.css';

const customOptions = [
  {
    id: 'jeans',
    title: 'Bespoke Jeans',
    description: 'Custom-fitted upcycled denim jeans tailored precisely to your measurements and style preferences.',
    image: '/bespoke-jeans.jpg'
  },
  {
    id: 'wallet-bag',
    title: 'Denim Wallet Bag',
    description: 'A unique, handcrafted wallet bag made from high-quality denim offcuts. Sustainable and stylish.',
    image: '/denim-wallet.jpg'
  },
  {
    id: 'hand-bag',
    title: 'Signature Tote',
    description: 'Spacious and durable signature tote bag, upcycled from vintage denim for a timeless look.',
    image: '/signature-tote.jpg'
  }
];

const Customise = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (optionId) => {
    setSelectedOption(optionId);
    const photoParam = uploadedPhoto ? `&photo=${encodeURIComponent(uploadedPhoto)}` : '';
    navigate(`/tailor-form?item=${optionId}${photoParam}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const clearPhoto = (e) => {
    e.stopPropagation();
    setUploadedPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="customise-page">
      <div className="container">
        <div className="customise-header text-center animate-fade-in-up">
          <span className="section-badge">Bespoke Design</span>
          <h1 className="section-title">Customise Your <span className="text-gradient">Piece</span></h1>
          <p className="section-subtitle">Choose an item to start your customisation journey with our expert tailors across Tunisia.</p>
        </div>

        {/* ── Photo Upload Panel ── */}
        <div className="upload-panel glass-panel animate-fade-in-up">
          <div className="upload-panel-header">
            <div className="upload-panel-icon">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="upload-panel-title">Upload Your Inspiration</h2>
              <p className="upload-panel-subtitle">Share a photo of your design idea or a reference piece — our tailors will bring it to life.</p>
            </div>
          </div>

          <div
            className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${uploadedPhoto ? 'has-photo' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploadedPhoto && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              id="photo-upload-input"
            />

            {uploadedPhoto ? (
              <div className="upload-preview">
                <img src={uploadedPhoto} alt="Your uploaded inspiration" className="preview-image" />
                <div className="preview-overlay">
                  <button className="preview-change-btn" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus size={16} /> Change Photo
                  </button>
                  <button className="preview-remove-btn" onClick={clearPhoto}>
                    <X size={16} /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon-ring">
                  <Upload size={28} />
                </div>
                <p className="upload-main-text">Drag & drop your photo here</p>
                <p className="upload-sub-text">or <span className="upload-browse-link">browse files</span></p>
                <p className="upload-hint">PNG, JPG, WEBP up to 10MB</p>
              </div>
            )}
          </div>

          {uploadedPhoto && (
            <div className="upload-success-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="upload-success-dot" />
                <span>Photo ready! Apply this to a base below, or proceed as a 100% custom piece.</span>
              </div>
              <button 
                className="btn-premium" 
                onClick={() => handleSelect('own-design')}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              >
                Proceed with Custom Design
              </button>
            </div>
          )}
        </div>

        {/* ── Options Grid ── */}
        <div className="options-grid">
          {customOptions.map((option) => (
            <div
              key={option.id}
              className="custom-option-card glass-panel animate-fade-in-up"
              onClick={() => handleSelect(option.id)}
            >
              <div className="card-image-wrapper">
                <img src={option.image} alt={option.title} />
                <div className="card-overlay">
                  <span className="overlay-text">Select Design</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="card-footer">
                  <button className="btn-premium w-100">
                    {uploadedPhoto ? 'Send Photo & Get Started' : 'Get Started'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customise;
