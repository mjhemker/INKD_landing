import React, { useState, useEffect } from 'react';
import { IconMenu2, IconX, IconRocket } from '@tabler/icons-react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">INKD</span>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button className="nav-link" onClick={() => scrollToSection('features')}>
            Features
          </button>
          <button className="nav-link" onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </button>
          <button className="nav-link" onClick={() => scrollToSection('local-demo')}>
            Find Artists
          </button>
          <button className="nav-link" onClick={() => scrollToSection('screenshots')}>
            Preview
          </button>
          
          <button 
            className="nav-cta-btn"
            onClick={() => scrollToSection('call-to-action')}
          >
            <IconRocket size={18} />
            Join Waitlist
          </button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;