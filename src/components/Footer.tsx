import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="brand-name">INKD</h3>
              <p className="brand-tagline">Where Ink Meets Inspiration</p>
              <p className="brand-description">
                Connecting tattoo enthusiasts with talented artists through innovative technology and seamless experiences.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#ai-assistant">AI Assistant</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#instagram" className="social-link">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="#tiktok" className="social-link">
                  <i className="fab fa-tiktok"></i>
                  <span>TikTok</span>
                </a>
                <a href="#twitter" className="social-link">
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="#facebook" className="social-link">
                  <i className="fab fa-facebook"></i>
                  <span>Facebook</span>
                </a>
              </div>
              
              <div className="contact-info">
                <a href="mailto:hello@inkdapp.com" className="contact-email">
                  <i className="fas fa-envelope"></i>
                  hello@inkdapp.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
            
            <div className="footer-copyright">
              <p>&copy; {currentYear} INKD. All rights reserved.</p>
            </div>
            
            <div className="footer-app-links">
              <p>Coming Soon:</p>
              <div className="app-badges">
                <a href="#app-store" className="app-badge">
                  <i className="fab fa-apple"></i>
                  <div>
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>
                <a href="#google-play" className="app-badge">
                  <i className="fab fa-google-play"></i>
                  <div>
                    <span>Get it on</span>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;