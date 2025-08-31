import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  IconMapPin, 
  IconStar, 
  IconClock, 
  IconCalendar,
  IconUser,
  IconPalette,
  IconHeart,
  IconX,
  IconCheck
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
  location: [number, number]; // [latitude, longitude]
  address: string;
  isOnline: boolean;
  verified: boolean;
}

// Custom pin icons using Material Design location pin
const createCustomPin = (isOnline: boolean, isVerified: boolean, isSelected: boolean = false) => {
  const scale = isSelected ? 1.4 : 1;
  const color = isOnline ? '#8A2BE2' : '#666';
  const size = isSelected ? 36 : 28;
  const verifiedIndicator = isVerified ? `<div style="position:absolute;top:-2px;right:-2px;width:12px;height:12px;background:#00FF88;border:2px solid white;border-radius:50%;z-index:10;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></div>` : '';
  
  return L.divIcon({
    html: `<div style="
      position: relative;
      transform: scale(${scale});
      transition: all 0.3s ease;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
    ">
      <svg xmlns="http://www.w3.org/2000/svg" height="${size}px" viewBox="0 -960 960 960" width="${size}px" fill="${color}" style="filter: drop-shadow(0 2px 4px rgba(255,255,255,0.1));">
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
      </svg>
      ${verifiedIndicator}
    </div>`,
    className: 'custom-artist-pin',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  });
};

const userLocationIcon = L.divIcon({
  html: `<div style="
    width: 16px;
    height: 16px;
    background: #00FF88;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
  "></div>`,
  className: 'user-location-pin',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const LocalDemo: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'top-rated'>('all');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<L.Map | null>(null);

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
      position: { x: 360, y: 175 },
      location: [39.9526, -75.1652], // Center City Philadelphia
      address: "Center City, Philadelphia, PA",
      isOnline: true,
      verified: true
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
      position: { x: 520, y: 225 },
      location: [39.9670, -75.1340], // Fishtown
      address: "Fishtown, Philadelphia, PA",
      isOnline: true,
      verified: true
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
      position: { x: 240, y: 300 },
      location: [39.9259, -75.1718], // South Philadelphia
      address: "South Philadelphia, PA",
      isOnline: false,
      verified: true
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
      position: { x: 560, y: 125 },
      location: [39.9739, -75.1341], // Northern Liberties
      address: "Northern Liberties, Philadelphia, PA",
      isOnline: true,
      verified: false
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
      position: { x: 200, y: 200 },
      location: [39.9671, -75.1830], // Fairmount
      address: "Fairmount, Philadelphia, PA",
      isOnline: true,
      verified: true
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
      position: { x: 440, y: 350 },
      location: [39.9390, -75.1372], // Near Delaware River
      address: "Old City, Philadelphia, PA",
      isOnline: true,
      verified: true
    }
  ];

  // Filter artists based on active filter
  const filteredArtists = artists.filter(artist => {
    switch (activeFilter) {
      case 'available':
        return artist.isOnline;
      case 'top-rated':
        return artist.rating >= 4.8;
      default:
        return true;
    }
  });

  // Geolocation effect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.log('Geolocation not available:', error);
        }
      );
    }
  }, []);

  const handleMarkerClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handleArtistCardClick = (artist: Artist) => {
    setSelectedArtist(artist);
    // Center map on artist location
    if (mapRef.current) {
      mapRef.current.setView(artist.location, 15, { animate: true });
    }
  };

  const handleFilterChange = (filter: 'all' | 'available' | 'top-rated') => {
    setActiveFilter(filter);
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
                <span>{filteredArtists.filter(a => a.isOnline).length} artists online</span>
              </div>
            </div>

            <div className="interactive-map">
              <MapContainer
                center={[39.9526, -75.1652]} // Philadelphia center
                zoom={12}
                className="leaflet-map"
                zoomControl={true}
                scrollWheelZoom={true}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* User location marker */}
                {userLocation && (
                  <Marker position={userLocation} icon={userLocationIcon}>
                    <Popup>
                      <div style={{ color: '#333', fontWeight: 'bold' }}>
                        Your Location
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {/* Artist markers */}
                {filteredArtists.map((artist) => (
                  <Marker
                    key={artist.id}
                    position={artist.location}
                    icon={createCustomPin(artist.isOnline, artist.verified, selectedArtist?.id === artist.id)}
                    eventHandlers={{
                      click: () => handleMarkerClick(artist),
                    }}
                  >
                    <Popup>
                      <div style={{ color: '#333', minWidth: '200px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {artist.name}
                          {artist.verified && <IconCheck size={14} style={{ color: '#00FF88' }} />}
                        </div>
                        <div style={{ marginBottom: '6px', color: '#666' }}>{artist.specialty}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <IconStar size={14} style={{ color: '#FFD700' }} />
                          <span>{artist.rating}</span>
                          <span style={{ color: '#666' }}>({artist.reviews} reviews)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <IconMapPin size={14} style={{ color: '#8A2BE2' }} />
                          <span>{artist.distance}</span>
                        </div>
                        <div style={{ color: '#8A2BE2', fontWeight: 'bold' }}>{artist.hourlyRate}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
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
                {userLocation && (
                  <div className="legend-item">
                    <div className="legend-marker user-location"></div>
                    <span>Your Location</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="artists-sidebar">
            <div className="sidebar-header">
              <h3>Local Artists ({filteredArtists.length})</h3>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${activeFilter === 'available' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('available')}
                >
                  Available
                </button>
                <button 
                  className={`filter-btn ${activeFilter === 'top-rated' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('top-rated')}
                >
                  Top Rated
                </button>
              </div>
            </div>

            <div className="artists-list">
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className={`artist-card ${selectedArtist?.id === artist.id ? 'selected' : ''}`}
                  onClick={() => handleArtistCardClick(artist)}
                >
                  <div className="artist-avatar">
                    <div className="avatar-placeholder">
                      <IconUser size={24} />
                    </div>
                    <div className={`status-indicator ${artist.isOnline ? 'online' : 'offline'}`}></div>
                  </div>
                  
                  <div className="artist-info">
                    <div className="artist-name">
                      {artist.name}
                      {artist.verified && (
                        <IconCheck size={16} style={{ color: '#00FF88', marginLeft: '6px' }} />
                      )}
                    </div>
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