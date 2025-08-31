import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import LocalDemo from './components/LocalDemo';
import HowItWorks from './components/HowItWorks';
import Screenshots from './components/Screenshots';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <LocalDemo />
      <Screenshots />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;