import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import './ChatBot.css';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('denyx_chat_messages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { id: 1, text: "Hi there! 👋 How can I help you with your sustainable denim journey today?", received: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('denyx_chat_messages', JSON.stringify(messages));
  }, [messages]);
  
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary Error Detail:', errorData);
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }
    const data = await response.json();
    return data.secure_url;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !image) || isSending) return;

    setIsSending(true);
    const userMessage = { id: Date.now(), text: message, image: imagePreview, received: false };
    setMessages([...messages, userMessage]);

    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      // Send to webhook
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          prompt: message
        }),
      });

      setMessage('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please check Cloudinary settings.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window glass-panel animate-fade-in-up">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="chatbot-title">DENYX Support</h4>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.received ? 'received' : 'sent'}`}>
                {msg.image && <img src={msg.image} alt="Upload" className="chat-image-preview" />}
                {msg.text && <p>{msg.text}</p>}
              </div>
            ))}
            {isSending && (
              <div className="chat-message received">
                <Loader2 className="animate-spin" size={16} />
                <p>Sending...</p>
              </div>
            )}
          </div>
          
          <div className="chatbot-input-area">
            {imagePreview && (
              <div className="input-image-preview">
                <img src={imagePreview} alt="Preview" />
                <button className="remove-image" onClick={() => { setImage(null); setImagePreview(null); }}>
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="input-row">
              <button 
                className="image-upload-btn" 
                onClick={() => fileInputRef.current.click()}
                disabled={isSending}
              >
                <ImageIcon size={20} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="chatbot-input" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
                disabled={isSending}
              />
              <button 
                className="chatbot-send-btn" 
                onClick={handleSend}
                disabled={isSending || (!message.trim() && !image)}
              >
                {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)} aria-label="Open chat support">
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
