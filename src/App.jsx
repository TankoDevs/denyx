import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Customise from './pages/Customise';
import TailorForm from './pages/TailorForm';
import Marketplace from './pages/Marketplace';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <CartSidebar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customise" element={<Customise />} />
            <Route path="/tailor-form" element={<TailorForm />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
