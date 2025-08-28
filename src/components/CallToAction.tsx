import React, { useState } from 'react';
import './CallToAction.css';

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'client' | 'artist'>('client');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="call-to-action section">
      <div className="cta-background">
        <div className="cta-shape shape-1"></div>
        <div className="cta-shape shape-2"></div>
        <div className="cta-shape shape-3"></div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Tattoo Experience?</h2>
          <p className="cta-subtitle">
            Join thousands of artists and clients who are already using INKD to create amazing tattoo experiences.
          </p>
          
          <div className="user-type-selector">
            <button 
              className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
              onClick={() => setUserType('client')}
            >
              <i className="fas fa-user"></i>
              I'm a Client
            </button>
            <button 
              className={`user-type-btn ${userType === 'artist' ? 'active' : ''}`}
              onClick={() => setUserType('artist')}
            >
              <i className="fas fa-palette"></i>
              I'm an Artist
            </button>
          </div>
          
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`Enter your email to join as ${userType === 'client' ? 'a client' : 'an artist'}`}
                  required
                  className="email-input"
                />
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <i className="fas fa-check"></i>
                      Added!
                    </>
                  ) : (
                    <>
                      <i className="fas fa-arrow-right"></i>
                      Join Waitlist
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <p className="form-disclaimer">
              By joining, you'll be the first to know when INKD launches. No spam, ever.
            </p>
          </form>
          
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Artists Ready</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Clients Waiting</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;