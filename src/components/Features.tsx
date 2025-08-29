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
        <div className="features-line-work">
          <svg className="features-lines" viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(138, 43, 226, 0.4)" />
                <stop offset="45%" stopColor="rgba(138, 43, 226, 0.6)" />
                <stop offset="55%" stopColor="rgba(153, 50, 204, 0.6)" />
                <stop offset="100%" stopColor="rgba(153, 50, 204, 0.4)" />
              </linearGradient>
            </defs>
            
            {/* Connecting lines between sections */}
            <path 
              d="M0,200 L1400,180" 
              stroke="url(#splitGradient)" 
              strokeWidth="1" 
              strokeDasharray="15 10"
              fill="none"
              className="connection-line"
            />
            <path 
              d="M0,800 L1400,820" 
              stroke="url(#splitGradient)" 
              strokeWidth="1" 
              strokeDasharray="20 8"
              fill="none"
              className="connection-line"
            />
            
            {/* Geometric shapes */}
            <rect 
              x="100" 
              y="100" 
              width="60" 
              height="60" 
              stroke="rgba(138, 43, 226, 0.4)" 
              strokeWidth="1"
              strokeDasharray="4 2"
              fill="none"
              transform="rotate(45 130 130)"
              className="geometric-shape"
            />
            <polygon 
              points="1200,150 1250,200 1200,250 1150,200" 
              stroke="rgba(153, 50, 204, 0.5)" 
              strokeWidth="1.5"
              strokeDasharray="8 5"
              fill="none"
              className="geometric-shape"
            />
            
            {/* Curved connecting elements */}
            <path 
              d="M300,400 Q500,300 700,400 Q900,500 1100,400" 
              stroke="rgba(138, 43, 226, 0.3)" 
              strokeWidth="1" 
              fill="none"
              className="curve-line"
            />
          </svg>
        </div>
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
            <div className="side-background">
              <img src="/swallow.svg" alt="" className="side-tattoo-design client-tattoo-1" />
              <img src="/tat_machine.svg" alt="" className="side-tattoo-design client-tattoo-2" />
            </div>
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
            <div className="side-background">
              <img src="/rose.svg" alt="" className="side-tattoo-design artist-tattoo-1" />
              <img src="/snake_dagger.svg" alt="" className="side-tattoo-design artist-tattoo-2" />
            </div>
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
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.4"/>
                  <stop offset="50%" stopColor="#9932CC" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              <path 
                d="M200,100 Q400,50 600,100" 
                stroke="url(#connectionGradient)" 
                strokeWidth="2" 
                strokeDasharray="12 6"
                fill="none"
                className="connection-path"
              />
              <path 
                d="M100,150 Q400,120 700,150" 
                stroke="rgba(138, 43, 226, 0.3)" 
                strokeWidth="1" 
                strokeDasharray="8 4"
                fill="none"
                className="connection-path secondary"
              />
              <circle 
                cx="150" 
                cy="100" 
                r="25" 
                stroke="rgba(153, 50, 204, 0.4)" 
                strokeWidth="1"
                strokeDasharray="6 3"
                fill="none"
                className="decorative-circle"
              />
              <circle 
                cx="650" 
                cy="130" 
                r="15" 
                stroke="rgba(138, 43, 226, 0.5)" 
                strokeWidth="1"
                strokeDasharray="4 2"
                fill="none"
                className="decorative-circle small"
              />
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