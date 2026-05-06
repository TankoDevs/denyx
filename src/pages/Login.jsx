import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    console.log('Login attempt:', email);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container glass-panel animate-fade-in-up">
        <div className="login-header">
          <img src="/icone.svg" alt="DENYX" className="login-logo" />
          <h1>Welcome Back</h1>
          <p>Sign in to your DENYX account</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="#">Create one</Link></p>
          <Link to="/" className="back-home">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
