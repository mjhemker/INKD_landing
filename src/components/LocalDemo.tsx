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
      position: { x: 45, y: 35 },
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
      position: { x: 65, y: 45 },
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
      position: { x: 30, y: 60 },
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
      position: { x: 70, y: 25 },
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
      position: { x: 25, y: 40 },
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
      position: { x: 55, y: 70 },
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
                <span>San Francisco, CA</span>
              </div>
              <div className="map-stats">
                <span>{artists.filter(a => a.isOnline).length} artists online</span>
              </div>
            </div>

            <div className="interactive-map">
              <div className="map-background">
                {/* Street grid overlay */}
                <div className="street-grid">
                  {Array.from({length: 8}).map((_, i) => (
                    <div key={`h-${i}`} className="street horizontal" style={{top: `${12.5 * (i + 1)}%`}} />
                  ))}
                  {Array.from({length: 8}).map((_, i) => (
                    <div key={`v-${i}`} className="street vertical" style={{left: `${12.5 * (i + 1)}%`}} />
                  ))}
                </div>

                {/* Neighborhoods */}
                <div className="neighborhoods">
                  <div className="neighborhood mission" style={{top: '60%', left: '20%'}}>Mission</div>
                  <div className="neighborhood soma" style={{top: '45%', left: '45%'}}>SOMA</div>
                  <div className="neighborhood castro" style={{top: '55%', left: '35%'}}>Castro</div>
                  <div className="neighborhood haight" style={{top: '35%', left: '25%'}}>Haight</div>
                </div>

                {/* Artist markers */}
                {artists.map((artist) => (
                  <div
                    key={artist.id}
                    className={`artist-marker ${artist.isOnline ? 'online' : 'offline'} ${hoveredArtist?.id === artist.id ? 'hovered' : ''}`}
                    style={{
                      left: `${artist.position.x}%`,
                      top: `${artist.position.y}%`
                    }}
                    onClick={() => handleMarkerClick(artist)}
                    onMouseEnter={() => setHoveredArtist(artist)}
                    onMouseLeave={() => setHoveredArtist(null)}
                  >
                    <div className="marker-pulse"></div>
                    <div className="marker-icon">
                      <IconPalette size={16} />
                    </div>
                    {hoveredArtist?.id === artist.id && (
                      <div className="marker-tooltip">
                        <div className="tooltip-content">
                          <strong>{artist.name}</strong>
                          <div className="tooltip-rating">
                            <IconStar size={12} />
                            <span>{artist.rating}</span>
                          </div>
                          <div className="tooltip-distance">{artist.distance}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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