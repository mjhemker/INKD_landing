import React from 'react';
import './AIAssistant.css';

const AIAssistant: React.FC = () => {
  const capabilities = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Booking Management',
      description: 'Automatically handle scheduling, availability, and appointment confirmations.'
    },
    {
      icon: 'fas fa-comments',
      title: 'Smart Messaging',
      description: 'Respond to client inquiries, share availability, and send reminders.'
    },
    {
      icon: 'fas fa-brain',
      title: 'Workflow Automation',
      description: 'From managing consultations to sending follow-ups, streamline daily tasks.'
    },
    {
      icon: 'fas fa-search-plus',
      title: 'AI Discovery Help',
      description: 'Suggest artists or styles based on user preferences and behavior.'
    }
  ];

  return (
    <section className="ai-assistant section">
      <div className="container">
        <div className="ai-content">
          <div className="ai-visual">
            <div className="ai-bot">
              <div className="bot-container">
                <div className="bot-head">
                  <div className="bot-face">
                    <div className="bot-eye left"></div>
                    <div className="bot-eye right"></div>
                    <div className="bot-mouth"></div>
                  </div>
                  <div className="bot-antenna">
                    <div className="antenna-tip"></div>
                  </div>
                </div>
                <div className="bot-body">
                  <div className="bot-screen">
                    <div className="screen-line"></div>
                    <div className="screen-line"></div>
                    <div className="screen-line short"></div>
                  </div>
                </div>
              </div>
              <div className="chat-bubbles">
                <div className="chat-bubble bubble-1">
                  <span>Available today at 3 PM?</span>
                </div>
                <div className="chat-bubble bubble-2">
                  <span>✓ Booking confirmed!</span>
                </div>
                <div className="chat-bubble bubble-3">
                  <span>Reminder: Appointment tomorrow</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ai-info">
            <h2 className="section-title">Your Personal Tattoo Concierge</h2>
            <p className="section-subtitle">
              INKD features a built-in AI assistant that helps artists and clients manage their tattoo journey effortlessly.
            </p>
            
            <div className="capabilities-grid">
              {capabilities.map((capability, index) => (
                <div key={index} className="capability">
                  <div className="capability-icon">
                    <i className={capability.icon}></i>
                  </div>
                  <div className="capability-content">
                    <h3 className="capability-title">{capability.title}</h3>
                    <p className="capability-description">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="ai-cta">
              <p className="ai-evolution">
                This assistant evolves as it learns — helping artists focus on their art and clients focus on getting inked.
              </p>
              <button className="btn btn-primary">
                <i className="fas fa-robot"></i>
                Experience AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;