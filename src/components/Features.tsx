import React, { useState, useRef, useEffect } from 'react';
import { 
  IconPalette, 
  IconDeviceMobile, 
  IconMapPin, 
  IconEye,
  IconSparkles,
  IconRocket,
  IconTarget,
  IconBolt,
  IconArrowRight,
  IconStar
} from '@tabler/icons-react';
import './Features.css';

const Features: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      Icon: IconPalette,
      accentIcon: IconSparkles,
      title: 'Curated Portfolios',
      description: 'Dive into handpicked collections of extraordinary tattoo artistry. Every artist is verified, every portfolio tells a story.',
      color: '#8A2BE2',
      gradient: 'linear-gradient(135deg, #8A2BE2, #9932CC)'
    },
    {
      Icon: IconDeviceMobile,
      accentIcon: IconRocket,
      title: 'Smart Booking',
      description: 'AI-powered scheduling that understands your preferences, availability, and connects you with the perfect artist at the right time.',
      color: '#9932CC',
      gradient: 'linear-gradient(135deg, #9932CC, #DA70D6)'
    },
    {
      Icon: IconMapPin,
      accentIcon: IconTarget,
      title: 'Artist Discovery',
      description: 'Explore a world of talent with our intelligent location-based matching. Find hidden gems and renowned artists alike.',
      color: '#DA70D6',
      gradient: 'linear-gradient(135deg, #DA70D6, #DDA0DD)'
    },
    {
      Icon: IconEye,
      accentIcon: IconBolt,
      title: 'AR Visualization',
      description: 'Revolutionary augmented reality technology lets you preview your tattoo with stunning accuracy before you commit.',
      color: '#DDA0DD',
      gradient: 'linear-gradient(135deg, #DDA0DD, #8A2BE2)'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features section" ref={sectionRef}>
      <div className="features-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
      
      <div className="container">
        <div className="features-header">
          <div className="section-badge">
            <IconStar size={16} />
            <span>Experience Excellence</span>
          </div>
          <h2 className="section-title">Why Choose INKD?</h2>
          <p className="section-subtitle">
            Revolutionary technology meets artistic mastery. Every feature designed to transform your tattoo journey.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${hoveredFeature === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{'--feature-color': feature.color, '--feature-gradient': feature.gradient} as React.CSSProperties}
            >
              <div className="feature-background">
                <div className="feature-glow"></div>
                <div className="feature-particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </div>
              
              <div className="feature-content">
                <div className="feature-icon-container">
                  <div className="feature-icon-bg"></div>
                  <feature.Icon size={40} className="feature-icon" />
                  <feature.accentIcon size={24} className="feature-emoji" />
                </div>
                
                <div className="feature-text">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                
                <div className="feature-footer">
                  <div className="feature-line"></div>
                  <button className="feature-learn-more">
                    <span>Explore</span>
                    <IconArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="features-bottom">
          <div className="connection-lines">
            <svg viewBox="0 0 800 200" className="connections-svg">
              <path 
                d="M200,100 Q400,50 600,100" 
                stroke="url(#connectionGradient)" 
                strokeWidth="2" 
                fill="none"
                className="connection-path"
              />
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#9932CC" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <p className="features-tagline">
            <span className="tagline-highlight">Seamlessly connected.</span> 
            <span> Intelligently designed. Beautifully crafted.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;