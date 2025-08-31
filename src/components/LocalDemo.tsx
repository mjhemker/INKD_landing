import React, { useState, useEffect } from 'react';
import { 
  IconMapPin, 
  IconStar, 
  IconClock, 
  IconPhone, 
  IconCalendar,
  IconUser,
  IconPalette,
  IconHeart,
  IconX
} from '@tabler/icons-react';
import './LocalDemo.css';

interface Artist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  portfolio: string[];
  bio: string;
  hourlyRate: string;
  nextAvailable: string;
  position: { x: number; y: number };
  isOnline: boolean;
}

const LocalDemo: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });

  const artists: Artist[] = [
    {
      id: 1,
      name: "Maya Chen",
      specialty: "Traditional & Neo-Traditional",
      rating: 4.9,
      reviews: 127,
      distance: "0.3 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Specializing in vibrant traditional pieces with a modern twist. 8+ years of experience creating memorable tattoos.",
      hourlyRate: "$180/hr",
      nextAvailable: "Today 2:00 PM",
      position: { x: 360, y: 175 }, // Center City
      isOnline: true
    },
    {
      id: 2,
      name: "Marcus Rivera",
      specialty: "Realism & Portraits",
      rating: 4.8,
      reviews: 203,
      distance: "0.7 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Award-winning portrait artist known for hyper-realistic black & grey work. Featured in Tattoo Magazine 2023.",
      hourlyRate: "$220/hr",
      nextAvailable: "Tomorrow 10:00 AM",
      position: { x: 520, y: 225 }, // Fishtown
      isOnline: true
    },
    {
      id: 3,
      name: "Zoe Williams",
      specialty: "Fine Line & Minimalist",
      rating: 4.9,
      reviews: 89,
      distance: "1.2 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Delicate fine line work and geometric designs. Perfect for first-time tattoo clients looking for subtle elegance.",
      hourlyRate: "$160/hr",
      nextAvailable: "Today 4:30 PM",
      position: { x: 240, y: 300 }, // South Philly
      isOnline: false
    },
    {
      id: 4,
      name: "Jake Thompson",
      specialty: "Japanese & Asian Fusion",
      rating: 4.7,
      reviews: 156,
      distance: "0.9 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Traditional Japanese techniques meets contemporary style. Studied under masters in Tokyo for 3 years.",
      hourlyRate: "$200/hr",
      nextAvailable: "Next Week",
      position: { x: 560, y: 125 }, // Northern Liberties
      isOnline: true
    },
    {
      id: 5,
      name: "Luna Santos",
      specialty: "Watercolor & Abstract",
      rating: 4.8,
      reviews: 94,
      distance: "1.5 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Vibrant watercolor tattoos that look like paintings on skin. Featured in international tattoo conventions.",
      hourlyRate: "$190/hr",
      nextAvailable: "Today 6:00 PM",
      position: { x: 200, y: 200 }, // Fairmount
      isOnline: true
    },
    {
      id: 6,
      name: "Alex Park",
      specialty: "Blackwork & Dotwork",
      rating: 4.9,
      reviews: 167,
      distance: "0.4 mi",
      image: "/api/placeholder/80/80",
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      bio: "Intricate blackwork and sacred geometry. Each piece is a unique work of art crafted with precision.",
      hourlyRate: "$175/hr",
      nextAvailable: "Tomorrow 2:00 PM",
      position: { x: 440, y: 350 }, // Near Delaware River
      isOnline: true
    }
  ];

  const handleMarkerClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setSelectedArtist(null);
  };

  return (
    <section className="local-demo section">
      <div className="demo-background">
        <div className="demo-blob blob-1"></div>
        <div className="demo-blob blob-2"></div>
        <div className="floating-ink-drop demo-drop-1"></div>
        <div className="floating-ink-drop demo-drop-2"></div>
      </div>

      <div className="container">
        <div className="demo-header">
          <div className="section-badge">
            <IconMapPin size={16} />
            <span>Local Discovery</span>
          </div>
          <h2 className="section-title">Find Artists Near You</h2>
          <p className="section-subtitle">
            Discover talented local artists in your area. Click on any marker to see their profile, portfolio, and book instantly.
          </p>
        </div>

        <div className="demo-content">
          <div className="map-container">
            <div className="map-header">
              <div className="map-location">
                <IconMapPin size={20} />
                <span>Philadelphia, PA</span>
              </div>
              <div className="map-stats">
                <span>{artists.filter(a => a.isOnline).length} artists online</span>
              </div>
            </div>

            <div className="interactive-map">
              <svg className="styled-map" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="50%" stopColor="#2a2a2a" />
                    <stop offset="100%" stopColor="#1e1e1e" />
                  </linearGradient>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(33, 150, 243, 0.8)" />
                    <stop offset="100%" stopColor="rgba(33, 150, 243, 0.6)" />
                  </linearGradient>
                  <linearGradient id="parkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(76, 175, 80, 0.7)" />
                    <stop offset="100%" stopColor="rgba(76, 175, 80, 0.5)" />
                  </linearGradient>
                  <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8A2BE2" />
                    <stop offset="100%" stopColor="#9932CC" />
                  </linearGradient>
                  <linearGradient id="offlinePinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#666" />
                    <stop offset="100%" stopColor="#555" />
                  </linearGradient>
                </defs>
                
                {/* Base map background */}
                <rect width="800" height="500" fill="url(#mapGradient)" />
                
                {/* Water features */}
                <rect x="0" y="0" width="120" height="500" fill="url(#waterGradient)" rx="5" /> {/* Schuylkill River */}
                <rect x="0" y="420" width="800" height="80" fill="url(#waterGradient)" rx="5" /> {/* Delaware River */}
                
                {/* Parks */}
                <ellipse cx="200" cy="120" rx="80" ry="60" fill="url(#parkGradient)" /> {/* Fairmount Park */}
                <ellipse cx="650" cy="350" rx="50" ry="40" fill="url(#parkGradient)" /> {/* Penn Treaty Park */}
                
                {/* City blocks */}
                <rect x="150" y="80" width="60" height="40" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="220" y="85" width="70" height="45" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="300" y="75" width="80" height="55" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="390" y="90" width="75" height="50" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="480" y="70" width="85" height="60" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                
                <rect x="140" y="150" width="55" height="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="210" y="160" width="90" height="65" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="320" y="155" width="70" height="55" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="410" y="170" width="80" height="50" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="510" y="145" width="75" height="60" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                
                <rect x="160" y="240" width="65" height="45" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="240" y="250" width="85" height="55" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="340" y="235" width="75" height="65" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="430" y="255" width="90" height="50" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="540" y="240" width="70" height="55" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                
                <rect x="170" y="320" width="80" height="60" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="270" y="330" width="70" height="45" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="360" y="315" width="85" height="65" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                <rect x="460" y="340" width="75" height="50" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(138, 43, 226, 0.2)" strokeWidth="1" rx="2" />
                
                {/* Major streets */}
                <line x1="130" y1="125" x2="580" y2="125" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* Market St */}
                <line x1="130" y1="200" x2="580" y2="200" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* Walnut St */}
                <line x1="130" y1="275" x2="580" y2="275" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* South St */}
                
                <line x1="200" y1="50" x2="200" y2="400" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* Broad St */}
                <line x1="320" y1="50" x2="320" y2="400" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* 15th St */}
                <line x1="440" y1="50" x2="440" y2="400" stroke="rgba(138, 43, 226, 0.4)" strokeWidth="3" /> {/* 8th St */}
                
                {/* Neighborhood labels */}
                <text x="320" y="190" textAnchor="middle" className="map-label">Center City</text>
                <text x="250" y="350" textAnchor="middle" className="map-label">South Philly</text>
                <text x="450" y="140" textAnchor="middle" className="map-label">Northern Liberties</text>
                <text x="520" y="280" textAnchor="middle" className="map-label">Fishtown</text>
                <text x="180" y="100" textAnchor="middle" className="map-label">Fairmount</text>
                
                {/* Artist markers positioned on map coordinates */}
                {artists.map((artist) => (
                  <g key={artist.id}>
                    {/* Marker pulse */}
                    <circle 
                      cx={artist.position.x} 
                      cy={artist.position.y} 
                      r="25" 
                      fill={artist.isOnline ? "rgba(138, 43, 226, 0.2)" : "rgba(128, 128, 128, 0.2)"}
                      className={artist.isOnline ? "svg-marker-pulse" : ""}
                    />
                    
                    {/* Location pin */}
                    <g 
                      className={`svg-artist-marker ${artist.isOnline ? 'online' : 'offline'} ${hoveredArtist?.id === artist.id ? 'hovered' : ''}`}
                      onClick={() => handleMarkerClick(artist)}
                      onMouseEnter={() => setHoveredArtist(artist)}
                      onMouseLeave={() => setHoveredArtist(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <path 
                        d={`M${artist.position.x},${artist.position.y - 20} 
                            C${artist.position.x - 8},${artist.position.y - 28} 
                            ${artist.position.x + 8},${artist.position.y - 28} 
                            ${artist.position.x},${artist.position.y - 20} 
                            L${artist.position.x},${artist.position.y} Z`}
                        fill={artist.isOnline ? "url(#pinGradient)" : "url(#offlinePinGradient)"}
                        stroke="white"
                        strokeWidth="2"
                        className="location-pin"
                      />
                      <circle 
                        cx={artist.position.x} 
                        cy={artist.position.y - 20} 
                        r="6" 
                        fill="white" 
                        stroke={artist.isOnline ? "#8A2BE2" : "#666"}
                        strokeWidth="2"
                      />
                    </g>
                    
                    {/* Tooltip */}
                    {hoveredArtist?.id === artist.id && (
                      <foreignObject 
                        x={artist.position.x - 60} 
                        y={artist.position.y - 80} 
                        width="120" 
                        height="60"
                        className="svg-tooltip"
                      >
                        <div className="svg-marker-tooltip">
                          <div className="tooltip-content">
                            <strong>{artist.name}</strong>
                            <div className="tooltip-rating">
                              <IconStar size={12} />
                              <span>{artist.rating}</span>
                            </div>
                            <div className="tooltip-distance">{artist.distance}</div>
                          </div>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            <div className="map-controls">
              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-marker online"></div>
                  <span>Available Now</span>
                </div>
                <div className="legend-item">
                  <div className="legend-marker offline"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>
          </div>

          <div className="artists-sidebar">
            <div className="sidebar-header">
              <h3>Local Artists ({artists.length})</h3>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Available</button>
                <button className="filter-btn">Top Rated</button>
              </div>
            </div>

            <div className="artists-list">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className={`artist-card ${selectedArtist?.id === artist.id ? 'selected' : ''}`}
                  onClick={() => handleMarkerClick(artist)}
                >
                  <div className="artist-avatar">
                    <div className="avatar-placeholder">
                      <IconUser size={24} />
                    </div>
                    <div className={`status-indicator ${artist.isOnline ? 'online' : 'offline'}`}></div>
                  </div>
                  
                  <div className="artist-info">
                    <div className="artist-name">{artist.name}</div>
                    <div className="artist-specialty">{artist.specialty}</div>
                    <div className="artist-stats">
                      <div className="stat">
                        <IconStar size={14} />
                        <span>{artist.rating}</span>
                      </div>
                      <div className="stat">
                        <IconMapPin size={14} />
                        <span>{artist.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="artist-rate">
                    {artist.hourlyRate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Modal */}
      {selectedArtist && (
        <div className="artist-modal-overlay" onClick={closeModal}>
          <div className="artist-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <IconX size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-avatar">
                <div className="avatar-placeholder large">
                  <IconUser size={40} />
                </div>
                <div className={`status-indicator large ${selectedArtist.isOnline ? 'online' : 'offline'}`}></div>
              </div>
              
              <div className="modal-artist-info">
                <h3 className="modal-artist-name">{selectedArtist.name}</h3>
                <p className="modal-specialty">{selectedArtist.specialty}</p>
                <div className="modal-stats">
                  <div className="stat">
                    <IconStar size={16} />
                    <span>{selectedArtist.rating}</span>
                    <span className="reviews">({selectedArtist.reviews} reviews)</span>
                  </div>
                  <div className="stat">
                    <IconMapPin size={16} />
                    <span>{selectedArtist.distance} away</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-bio">
                <h4>About</h4>
                <p>{selectedArtist.bio}</p>
              </div>

              <div className="modal-portfolio">
                <h4>Portfolio</h4>
                <div className="portfolio-grid">
                  {selectedArtist.portfolio.map((image, index) => (
                    <div key={index} className="portfolio-item">
                      <div className="portfolio-placeholder">
                        <IconPalette size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-booking">
                <div className="booking-info">
                  <div className="booking-stat">
                    <IconClock size={20} />
                    <div>
                      <span className="stat-label">Next Available</span>
                      <span className="stat-value">{selectedArtist.nextAvailable}</span>
                    </div>
                  </div>
                  <div className="booking-stat">
                    <IconPalette size={20} />
                    <div>
                      <span className="stat-label">Hourly Rate</span>
                      <span className="stat-value">{selectedArtist.hourlyRate}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="btn btn-secondary">
                    <IconHeart size={18} />
                    Save Artist
                  </button>
                  <button className="btn btn-primary">
                    <IconCalendar size={18} />
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LocalDemo;