import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import TradeIn from './components/TradeIn';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Process />
        <TradeIn />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
