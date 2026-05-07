import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, ImagePlus, Loader2, Wand2, Trash2 } from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';
import './ChatBot.css';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

// Phrases to ignore from the webhook (n8n workflow triggers)
const IGNORED_PHRASES = ['workflow was started', 'execution was started', 'ok'];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [statusText, setStatusText] = useState('');

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('denyx_chat_messages');
      return saved ? JSON.parse(saved) : [
        { id: 1, text: "Hello! 👋 I'm your DENYX AI stylist. Upload a photo and describe your customisation idea.", received: true }
      ];
    } catch { return []; }
  });

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('denyx_chat_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const clearImage = () => { setImage(null); setImagePreview(null); };

  const clearChat = () => {
    setMessages([{ id: 1, text: "Hello! 👋 I'm your DENYX AI stylist. Upload a photo and describe your customisation idea.", received: true }]);
  };

  // Extract a useful URL from various webhook response shapes
  const extractResultUrl = (data) => {
    if (!data) return null;
    // Common n8n output fields
    const candidates = [
      data?.image_url, data?.imageUrl, data?.output_url, data?.outputUrl,
      data?.result_url, data?.resultUrl, data?.url, data?.secure_url,
      data?.data?.image_url, data?.data?.url,
      data?.[0]?.image_url, data?.[0]?.url, data?.[0]?.output_url
    ];
    return candidates.find(c => typeof c === 'string' && c.startsWith('http')) || null;
  };

  // Extract a text reply, ignoring n8n boilerplate messages
  const extractTextReply = (data) => {
    if (!data) return null;
    const raw = data?.output || data?.message || data?.reply || data?.text || data?.response ||
      data?.[0]?.output || data?.[0]?.message || data?.[0]?.text;
    if (!raw) return null;
    const lower = String(raw).toLowerCase().trim();
    if (IGNORED_PHRASES.some(p => lower.includes(p))) return null;
    return String(raw);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if ((!message.trim() && !image) || isSending) return;

    setIsSending(true);

    // Capture and clear inputs immediately
    const currentMessage = message;
    const currentImageFile = image;
    const currentPreview = imagePreview;

    setMessage('');
    setImage(null);
    setImagePreview(null);

    // Add user message to chat
    const userMsg = { id: Date.now(), text: currentMessage, image: currentPreview, received: false };
    setMessages(prev => [...prev, userMsg]);

    try {
      // ── Step 1: Upload image to Cloudinary ──────────────────────────
      let inputImageUrl = '';
      if (currentImageFile) {
        setStatusText('Uploading image...');
        inputImageUrl = await uploadImage(currentImageFile);
        console.log('✅ Cloudinary input URL:', inputImageUrl);
      }

      // ── Step 2: POST to webhook and WAIT for full response ───────────
      setStatusText('Processing your request...');
      console.log('📤 Webhook payload:', { image_url: inputImageUrl, prompt: currentMessage });

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: inputImageUrl, prompt: currentMessage }),
      });

      // ── Step 3: Parse the webhook response ───────────────────────────
      let responseData = null;
      try {
        responseData = await webhookResponse.json();
        console.log('📥 Webhook response:', responseData);
      } catch {
        console.log('Webhook returned non-JSON response');
      }

      const resultUrl = extractResultUrl(responseData);
      const textReply = extractTextReply(responseData);

      // ── Step 4: Upload result image to Cloudinary if we got a URL ────
      let finalImageUrl = null;
      if (resultUrl) {
        setStatusText('Uploading result...');
        try {
          // Fetch the result image and re-upload to our Cloudinary
          const blob = await fetch(resultUrl).then(r => r.blob());
          const resultFile = new File([blob], 'result.jpg', { type: blob.type || 'image/jpeg' });
          finalImageUrl = await uploadImage(resultFile);
          console.log('✅ Cloudinary result URL:', finalImageUrl);
        } catch (err) {
          console.warn('Could not re-upload result to Cloudinary, using direct URL:', err);
          finalImageUrl = resultUrl; // fallback to original URL
        }
      }

      // ── Step 5: Add bot reply to chat ────────────────────────────────
      if (finalImageUrl || textReply) {
        const botMsg = {
          id: Date.now() + 1,
          text: textReply || (finalImageUrl ? 'Here is your customised design! ✨' : null),
          image: finalImageUrl,
          received: true
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        // Got some response but nothing useful — stay silent (don't show boilerplate)
        console.log('No meaningful content in webhook response, not adding bot message.');
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Something went wrong: ${error.message}`,
        received: true,
        isError: true
      }]);
    } finally {
      setIsSending(false);
      setStatusText('');
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window animate-fade-in-up">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Wand2 size={18} />
              </div>
              <div>
                <h4 className="chatbot-title">DENYX AI Stylist</h4>
                <span className="chatbot-status">
                  <span className="status-dot" />
                  {isSending ? statusText || 'Working...' : 'Online'}
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button className="chatbot-action-btn" onClick={clearChat} title="Clear chat">
                <Trash2 size={16} />
              </button>
              <button className="chatbot-action-btn" onClick={() => setIsOpen(false)} title="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Messages ───────────────────────────────────── */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-wrapper ${msg.received ? 'left' : 'right'}`}>
                {msg.received && (
                  <div className="bot-avatar-small"><Wand2 size={12} /></div>
                )}
                <div className={`chat-bubble ${msg.received ? 'bot' : 'user'} ${msg.isError ? 'error' : ''}`}>
                  {msg.image && (
                    <img src={msg.image} alt="content" className="bubble-image" />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isSending && (
              <div className="chat-bubble-wrapper left">
                <div className="bot-avatar-small"><Wand2 size={12} /></div>
                <div className="chat-bubble bot typing-indicator">
                  <Loader2 className="animate-spin" size={14} />
                  <span>{statusText || 'Processing...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input Area ─────────────────────────────────── */}
          <div className="chatbot-input-area">
            {imagePreview && (
              <div className="image-preview-chip">
                <img src={imagePreview} alt="Preview" />
                <button className="remove-chip" onClick={clearImage}>
                  <X size={11} />
                </button>
              </div>
            )}
            <div className="input-row">
              <button
                className="attach-btn"
                onClick={() => fileInputRef.current.click()}
                disabled={isSending}
                title="Upload photo"
              >
                <ImagePlus size={19} />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
              <textarea
                ref={textareaRef}
                placeholder="Describe your design idea..."
                className="chatbot-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); }
                }}
                disabled={isSending}
                rows="1"
              />
              <button
                className={`send-btn ${(!message.trim() && !image) || isSending ? 'disabled' : 'active'}`}
                onClick={handleSend}
                disabled={isSending || (!message.trim() && !image)}
              >
                {isSending ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
              </button>
            </div>
            <p className="input-hint">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        className={`chatbot-fab ${isOpen ? 'fab-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Stylist"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
};

export default ChatBot;
