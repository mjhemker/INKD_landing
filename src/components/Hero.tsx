import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-brand">INKD</span>
              <span className="hero-tagline">Where Ink Meets Inspiration</span>
            </h1>
            <p className="hero-subtitle">
              Discover talented tattoo artists, book appointments seamlessly, and explore stunning portfolios all in one place.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                Get Started
              </button>
              <button className="btn btn-secondary btn-large">
                <i className="fas fa-list"></i>
                Join Waitlist
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="mockup-content">
                    <div className="mockup-header">
                      <div className="mockup-avatar"></div>
                      <div className="mockup-info">
                        <div className="mockup-name"></div>
                        <div className="mockup-location"></div>
                      </div>
                    </div>
                    <div className="mockup-gallery">
                      <div className="mockup-image"></div>
                      <div className="mockup-image"></div>
                      <div className="mockup-image"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;