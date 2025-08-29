import React, { useEffect, useRef } from 'react';
import { 
  IconPalette, 
  IconDeviceMobile, 
  IconRobot, 
  IconHeart, 
  IconShare, 
  IconCalendarEvent,
  IconBolt,
  IconTarget,
  IconSparkles,
  IconRocket,
  IconBell
} from '@tabler/icons-react';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesRef.current.appendChild(particle);
      }
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="particles-container" ref={particlesRef}></div>
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="tattoo-designs">
          <img src="/rose.svg" alt="" className="tattoo-design tattoo-rose" />
          <img src="/swallow.svg" alt="" className="tattoo-design tattoo-swallow" />
        </div>
        <div className="line-work">
          <svg className="hero-lines" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(138, 43, 226, 0.6)" />
                <stop offset="50%" stopColor="rgba(153, 50, 204, 0.8)" />
                <stop offset="100%" stopColor="rgba(138, 43, 226, 0.4)" />
              </linearGradient>
            </defs>
            <path 
              d="M100,200 Q300,100 500,200 T900,150" 
              stroke="url(#lineGradient1)" 
              strokeWidth="1.5" 
              strokeDasharray="8 4"
              fill="none"
              className="animated-line line-1"
            />
            <path 
              d="M200,600 Q400,500 600,600 T1000,550" 
              stroke="rgba(138, 43, 226, 0.4)" 
              strokeWidth="1" 
              strokeDasharray="12 6"
              fill="none"
              className="animated-line line-2"
            />
            <circle 
              cx="150" 
              cy="300" 
              r="80" 
              stroke="rgba(153, 50, 204, 0.3)" 
              strokeWidth="1"
              strokeDasharray="5 3"
              fill="none"
              className="animated-circle circle-1"
            />
            <polygon 
              points="900,300 950,350 900,400 850,350" 
              stroke="rgba(138, 43, 226, 0.5)" 
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              className="animated-shape shape-diamond"
            />
          </svg>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-brand">
                <span className="letter">I</span>
                <span className="letter">N</span>
                <span className="letter">K</span>
                <span className="letter">D</span>
              </span>
              <span className="hero-tagline">Where Ink Meets Inspiration</span>
            </h1>
            <p className="hero-subtitle">
              The ultimate local platform connecting tattoo enthusiasts with nearby world-class artists. 
              Discover local portfolios, book seamlessly with artists in your area, and bring your vision to life with cutting-edge AR technology.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <IconPalette size={20} className="stat-icon" />
                <span className="stat-text">Local Artists</span>
              </div>
              <div className="stat-item">
                <IconDeviceMobile size={20} className="stat-icon" />
                <span className="stat-text">Smart Booking</span>
              </div>
              <div className="stat-item">
                <IconRobot size={20} className="stat-icon" />
                <span className="stat-text">AI Powered</span>
              </div>
            </div>
            <div className="hero-cta">
              <button className="btn btn-primary btn-large">
                <span className="btn-content">
                  <IconRocket size={20} />
                  Launch Experience
                </span>
                <div className="btn-glow"></div>
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => document.querySelector('.call-to-action')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="btn-content">
                  <IconBell size={20} />
                  Get Early Access
                </span>
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-container">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-screen">
                    <div className="screen-glow"></div>
                    <div className="mockup-content">
                      <div className="mockup-header">
                        <div className="mockup-avatar">
                          <div className="avatar-glow"></div>
                        </div>
                        <div className="mockup-info">
                          <div className="mockup-name"></div>
                          <div className="mockup-location">
                            <div className="location-dot"></div>
                          </div>
                        </div>
                        <div className="mockup-status">
                          <div className="status-online"></div>
                        </div>
                      </div>
                      <div className="mockup-gallery">
                        <div className="mockup-image img-1">
                          <div className="image-overlay"></div>
                        </div>
                        <div className="mockup-image img-2">
                          <div className="image-overlay"></div>
                        </div>
                        <div className="mockup-image img-3">
                          <div className="image-overlay"></div>
                        </div>
                      </div>
                      <div className="mockup-actions">
                        <div className="action-btn">
                          <IconHeart size={16} />
                        </div>
                        <div className="action-btn">
                          <IconShare size={16} />
                        </div>
                        <div className="action-btn primary">
                          <IconCalendarEvent size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="floating-elements">
                <div className="floating-card card-1">
                  <IconBolt size={20} className="card-icon" />
                  <div className="card-text">Instant Match</div>
                </div>
                <div className="floating-card card-2">
                  <IconTarget size={20} className="card-icon" />
                  <div className="card-text">Perfect Style</div>
                </div>
                <div className="floating-card card-3">
                  <IconSparkles size={20} className="card-icon" />
                  <div className="card-text">AR Preview</div>
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