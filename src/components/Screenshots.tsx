import React, { useState } from 'react';
import './Screenshots.css';

const Screenshots: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const screenshots = [
    {
      title: 'Discover Artists',
      description: 'Browse local tattoo artists and their stunning portfolios',
      mockup: 'discover'
    },
    {
      title: 'View Portfolios',
      description: 'Explore detailed artist profiles and their best work',
      mockup: 'portfolio'
    },
    {
      title: 'Book Appointments',
      description: 'Schedule consultations and appointments seamlessly',
      mockup: 'booking'
    },
    {
      title: 'AR Preview',
      description: 'See how tattoos look on you with AR technology',
      mockup: 'ar'
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="screenshots section">
      <div className="container">
        <h2 className="section-title">See INKD in Action</h2>
        <p className="section-subtitle">
          Experience the seamless interface designed for tattoo enthusiasts and artists
        </p>
        
        <div className="screenshots-container">
          <button className="nav-btn nav-prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="screenshots-slider">
            <div className="screenshots-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-slide">
                  <div className="phone-preview">
                    <div className="phone-frame-preview">
                      <div className="phone-screen-preview">
                        <div className={`mockup-${screenshot.mockup}`}>
                          <div className="mockup-header-bar">
                            <div className="mockup-notch"></div>
                          </div>
                          <div className="mockup-content-area">
                            {screenshot.mockup === 'discover' && (
                              <>
                                <div className="search-bar"></div>
                                <div className="artist-cards">
                                  <div className="artist-card"></div>
                                  <div className="artist-card"></div>
                                </div>
                              </>
                            )}
                            {screenshot.mockup === 'portfolio' && (
                              <>
                                <div className="profile-header">
                                  <div className="profile-avatar"></div>
                                  <div className="profile-info"></div>
                                </div>
                                <div className="portfolio-grid">
                                  <div className="portfolio-item"></div>
                                  <div className="portfolio-item"></div>
                                  <div className="portfolio-item"></div>
                                  <div className="portfolio-item"></div>
                                </div>
                              </>
                            )}
                            {screenshot.mockup === 'booking' && (
                              <>
                                <div className="calendar-header"></div>
                                <div className="calendar-grid">
                                  <div className="calendar-day"></div>
                                  <div className="calendar-day active"></div>
                                  <div className="calendar-day"></div>
                                  <div className="calendar-day"></div>
                                </div>
                                <div className="time-slots">
                                  <div className="time-slot"></div>
                                  <div className="time-slot"></div>
                                </div>
                              </>
                            )}
                            {screenshot.mockup === 'ar' && (
                              <>
                                <div className="ar-viewfinder">
                                  <div className="ar-overlay"></div>
                                  <div className="ar-controls">
                                    <div className="ar-button"></div>
                                    <div className="ar-button"></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="screenshot-info">
                    <h3>{screenshot.title}</h3>
                    <p>{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="nav-btn nav-next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="slide-indicators">
          {screenshots.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;