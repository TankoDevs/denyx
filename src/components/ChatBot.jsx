import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';
import './ChatBot.css';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

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

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !image) || isSending) return;

    setIsSending(true);

    // Save current values before clearing
    const currentMessage = message;
    const currentImageFile = image;        // keep the File object
    const currentPreview = imagePreview;   // keep the base64 preview

    // Show user message immediately in the chat
    const userMsg = { id: Date.now(), text: currentMessage, image: currentPreview, received: false };
    setMessages(prev => [...prev, userMsg]);

    // Clear the input fields right away
    setMessage('');
    setImage(null);
    setImagePreview(null);

    try {
      // Step 1: Upload image to Cloudinary → receive secure URL
      let imageUrl = '';
      if (currentImageFile) {
        console.log('Uploading image to Cloudinary...');
        imageUrl = await uploadImage(currentImageFile);
        console.log('✅ Cloudinary URL:', imageUrl);
      }

      // Step 2: Send image_url + prompt to the webhook
      const payload = { image_url: imageUrl, prompt: currentMessage };
      console.log('📤 Calling webhook:', WEBHOOK_URL, payload);

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Step 3: Show the webhook response as a bot reply (if any)
      let botReply = 'Message received! ✅ Our team will get back to you.';
      if (webhookResponse.ok) {
        try {
          const responseData = await webhookResponse.json();
          if (responseData?.output || responseData?.message || responseData?.reply) {
            botReply = responseData.output || responseData.message || responseData.reply;
          }
        } catch {
          // Response may not be JSON, that's fine
        }
      }

      const botMsg = { id: Date.now() + 1, text: botReply, received: true };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errMsg = { id: Date.now() + 1, text: `Error: ${error.message}`, received: true };
      setMessages(prev => [...prev, errMsg]);
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
              <textarea 
                placeholder="Describe your design or ask a question..." 
                className="chatbot-input" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                disabled={isSending}
                rows="1"
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
