import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse Tattoos & Artists',
      description: 'Explore thousands of tattoo designs and artist portfolios to find your perfect style and artist match.',
      icon: 'fas fa-search'
    },
    {
      number: '02',
      title: 'Chat & Schedule Appointments',
      description: 'Connect directly with artists, discuss your ideas, and book appointments that fit your schedule.',
      icon: 'fas fa-comments'
    },
    {
      number: '03',
      title: 'Visit Your Favorite Artists',
      description: 'Meet with your chosen artist and bring your tattoo vision to life with confidence.',
      icon: 'fas fa-heart'
    }
  ];

  return (
    <section className="how-it-works section">
      <div className="container">
        <h2 className="section-title">How INKD Works</h2>
        <p className="section-subtitle">
          Get your perfect tattoo in three simple steps
        </p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <i className="fas fa-arrow-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;