import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  const features = [
    {
      icon: 'fas fa-images',
      title: 'Explore Portfolios',
      description: 'Browse stunning tattoo designs and artist portfolios to find your perfect match and inspiration.'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Book Appointments',
      description: 'Schedule appointments directly with artists through our seamless booking system.'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Find Nearby Artists',
      description: 'Discover talented tattoo artists in your area using our interactive map feature.'
    },
    {
      icon: 'fas fa-eye',
      title: 'AR Tattoo Preview',
      description: 'Use augmented reality to preview how tattoos will look on your skin before committing.'
    }
  ];

  return (
    <section className="features section">
      <div className="container">
        <h2 className="section-title">Why Choose INKD?</h2>
        <p className="section-subtitle">
          Everything you need to connect with the perfect tattoo artist and bring your vision to life.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;