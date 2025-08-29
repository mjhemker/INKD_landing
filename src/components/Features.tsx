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

  const clientFeatures = [
    {
      Icon: IconMapPin,
      accentIcon: IconTarget,
      title: 'Local Artist Discovery',
      description: 'Find talented artists in your area with our intelligent location-based matching. Discover hidden gems and renowned artists nearby.',
      color: '#8A2BE2',
      gradient: 'linear-gradient(135deg, #8A2BE2, #9932CC)'
    },
    {
      Icon: IconDeviceMobile,
      accentIcon: IconRocket,
      title: 'Smart Booking',
      description: 'Effortless scheduling that matches your availability with local artists. Book consultations and sessions with just a few taps.',
      color: '#9932CC',
      gradient: 'linear-gradient(135deg, #9932CC, #DA70D6)'
    },
    {
      Icon: IconEye,
      accentIcon: IconBolt,
      title: 'AR Visualization',
      description: 'See your tattoo before you get it with revolutionary augmented reality technology. Preview designs on your actual body.',
      color: '#DA70D6',
      gradient: 'linear-gradient(135deg, #DA70D6, #DDA0DD)'
    }
  ];

  const artistFeatures = [
    {
      Icon: IconPalette,
      accentIcon: IconSparkles,
      title: 'Portfolio Showcase',
      description: 'Create stunning digital portfolios that attract local clients. Showcase your best work with high-quality galleries and detailed descriptions.',
      color: '#8A2BE2',
      gradient: 'linear-gradient(135deg, #8A2BE2, #9932CC)'
    },
    {
      Icon: IconRocket,
      accentIcon: IconStar,
      title: 'AI Business Assistant',
      description: 'Smart assistant helps manage appointments, client communications, and business operations. Focus on your art while AI handles the admin.',
      color: '#9932CC',
      gradient: 'linear-gradient(135deg, #9932CC, #DA70D6)'
    },
    {
      Icon: IconTarget,
      accentIcon: IconBolt,
      title: 'Client Management',
      description: 'Streamlined tools for managing client relationships, tracking consultations, and handling payments. Everything you need to run your business.',
      color: '#DA70D6',
      gradient: 'linear-gradient(135deg, #DA70D6, #DDA0DD)'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
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
            Revolutionary local technology meets artistic mastery. Every feature designed to transform your tattoo journey.
          </p>
        </div>
        
        {/* Split Screen Layout */}
        <div className="split-container">
          {/* Client Side - Left */}
          <div className="split-side client-side">
            <div className="side-background"></div>
            <div className="side-content">
              <div className="side-header">
                <h3 className="side-title">For Tattoo Enthusiasts</h3>
                <p className="side-subtitle">Discover, visualize, and book with local artists</p>
              </div>
              
              <div className="side-features">
                {clientFeatures.map((feature, index) => (
                  <div 
                    key={`client-${index}`} 
                    className={`split-feature-card ${hoveredFeature === index ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    style={{'--feature-color': feature.color, '--feature-gradient': feature.gradient} as React.CSSProperties}
                  >
                    <div className="split-card-icon">
                      <feature.Icon size={28} />
                    </div>
                    <div className="split-card-content">
                      <h4 className="split-card-title">{feature.title}</h4>
                      <p className="split-card-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="split-divider">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <IconSparkles size={24} />
            </div>
          </div>
          
          {/* Artist Side - Right */}
          <div className="split-side artist-side">
            <div className="side-background"></div>
            <div className="side-content">
              <div className="side-header">
                <h3 className="side-title">For Tattoo Artists</h3>
                <p className="side-subtitle">Showcase your work, manage your business, and connect with local clients</p>
              </div>
              
              <div className="side-features">
                {artistFeatures.map((feature, index) => (
                  <div 
                    key={`artist-${index}`} 
                    className={`split-feature-card ${hoveredFeature === (index + 10) ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredFeature(index + 10)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    style={{'--feature-color': feature.color, '--feature-gradient': feature.gradient} as React.CSSProperties}
                  >
                    <div className="split-card-icon">
                      <feature.Icon size={28} />
                    </div>
                    <div className="split-card-content">
                      <h4 className="split-card-title">{feature.title}</h4>
                      <p className="split-card-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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