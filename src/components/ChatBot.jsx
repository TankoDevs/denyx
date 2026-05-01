import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="chat-message received">
              <p>Hi there! 👋 How can I help you with your sustainable denim journey today?</p>
            </div>
            {/* Future messages will go here */}
          </div>
          
          <div className="chatbot-input-area">
            <input 
              type="text" 
              placeholder="Chat functionality coming soon..." 
              className="chatbot-input" 
              disabled 
            />
            <button className="chatbot-send-btn" disabled>
              <Send size={18} />
            </button>
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
