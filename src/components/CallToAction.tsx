import React, { useState } from 'react';
import { IconPalette, IconBolt, IconRocket, IconArrowRight, IconCheck, IconUser } from '@tabler/icons-react';
import { addToWaitlist } from '../services/waitlist';
import './CallToAction.css';

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'client' | 'artist'>('client');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    console.log('Form submitted:', { email: email.trim(), userType });

    try {
      const success = await addToWaitlist(email.trim(), userType);
      console.log('Waitlist result:', success);
      
      if (success) {
        console.log('✅ Success! Showing confirmation...');
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2500);
      } else {
        console.log('❌ Failed, showing error...');
        setErrorMessage('Unable to join waitlist. Please try again.');
      }
    } catch (error) {
      console.log('❌ Exception caught:', error);
      setErrorMessage('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="call-to-action" className="call-to-action section">
      <div className="cta-background">
        <div className="cta-ink-drop cta-drop-1"></div>
        <div className="cta-ink-drop cta-drop-2"></div>
        <div className="cta-ink-drop cta-drop-3"></div>
        <div className="cta-blob blob-1"></div>
        <div className="cta-blob blob-2"></div>
        <div className="cta-tattoo-designs">
          <img src="/snake_dagger.svg" alt="" className="cta-tattoo-design cta-snake" style={{'--base-rotation': '25deg'} as React.CSSProperties} />
          <img src="/tat_machine.svg" alt="" className="cta-tattoo-design cta-machine" style={{'--base-rotation': '-30deg'} as React.CSSProperties} />
        </div>
        <div className="cta-line-work">
          <svg className="cta-lines" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,300 Q300,200 600,300 Q900,400 1200,300" 
              stroke="rgba(138, 43, 226, 0.3)" 
              strokeWidth="1" 
              strokeDasharray="10 5"
              fill="none"
              className="cta-flow-line"
            />
            <path 
              d="M100,150 L1100,150" 
              stroke="rgba(153, 50, 204, 0.2)" 
              strokeWidth="0.5" 
              strokeDasharray="20 15"
              fill="none"
              className="cta-horizon-line"
            />
            <path 
              d="M100,450 L1100,450" 
              stroke="rgba(138, 43, 226, 0.2)" 
              strokeWidth="0.5" 
              strokeDasharray="25 10"
              fill="none"
              className="cta-horizon-line bottom"
            />
            <polygon 
              points="200,100 220,120 200,140 180,120" 
              stroke="rgba(138, 43, 226, 0.4)" 
              strokeWidth="1"
              strokeDasharray="3 2"
              fill="none"
              className="cta-accent-shape diamond-1"
            />
            <polygon 
              points="1000,500 1020,520 1000,540 980,520" 
              stroke="rgba(153, 50, 204, 0.4)" 
              strokeWidth="1"
              strokeDasharray="3 2"
              fill="none"
              className="cta-accent-shape diamond-2"
            />
          </svg>
        </div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Local Tattoo Experience?</h2>
          <p className="cta-subtitle">
            Join thousands of local artists and clients who are already using INKD to create amazing tattoo experiences in their communities.
          </p>
          
          <div className="user-type-selector">
            <button 
              className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
              onClick={() => setUserType('client')}
              type="button"
            >
              <IconUser size={18} />
              I'm a Client
            </button>
            <button 
              className={`user-type-btn ${userType === 'artist' ? 'active' : ''}`}
              onClick={() => setUserType('artist')}
              type="button"
            >
              <IconPalette size={18} />
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
                  disabled={isSubmitted || isSubmitting}
                >
                  {isSubmitted ? (
                    <>
                      <IconCheck size={16} />
                      Added!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <IconArrowRight size={16} className="spinning" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <IconArrowRight size={16} />
                      Join Waitlist
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {errorMessage && (
              <p className="form-error" style={{ color: '#ff4444', marginTop: '8px', fontSize: '0.9rem' }}>
                {errorMessage}
              </p>
            )}
            <p className="form-disclaimer">
              By joining, you'll be the first to know when INKD launches. No spam, ever.
            </p>
          </form>
          
          <div className="cta-features">
            <div className="feature-item">
              <IconPalette size={20} className="feature-icon" />
              <span className="feature-text">Join the creative community</span>
            </div>
            <div className="feature-item">
              <IconBolt size={20} className="feature-icon" />
              <span className="feature-text">Be among the first to experience</span>
            </div>
            <div className="feature-item">
              <IconRocket size={20} className="feature-icon" />
              <span className="feature-text">Shape the future of tattoos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;