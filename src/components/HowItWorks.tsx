import React from 'react';
import { 
  IconSearch, 
  IconMessages, 
  IconHeart,
  IconCalendar,
  IconUsers,
  IconBrain,
  IconTarget,
  IconSparkles
} from '@tabler/icons-react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const enthusiastSteps = [
    {
      number: '01',
      title: 'Discover Local Artists',
      description: 'Browse nearby tattoo artists, explore portfolios, and find the perfect style match in your area.',
      Icon: IconSearch
    },
    {
      number: '02',
      title: 'Connect & Visualize',
      description: 'Chat with artists, share ideas, and use AR to preview your tattoo before committing.',
      Icon: IconMessages
    },
    {
      number: '03',
      title: 'Book & Get Inked',
      description: 'Schedule your appointment and bring your vision to life with confidence.',
      Icon: IconHeart
    }
  ];

  const artistFeatures = [
    {
      Icon: IconBrain,
      title: 'Workflow Automation',
      description: 'From managing consultations to sending follow-ups, streamline daily tasks.'
    },
    {
      Icon: IconCalendar,
      title: 'Smart Scheduling',
      description: 'AI-powered booking system manages your calendar, deposits, and client communications.'
    },
    {
      Icon: IconUsers,
      title: 'Client Management',
      description: 'Track consultations, manage follow-ups, and build lasting relationships with your clients.'
    },
    {
      Icon: IconBrain,
      title: 'AI Business Assistant',
      description: 'Get insights on pricing, market trends, and personalized recommendations to grow your business.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works section">
      <div className="works-background">
        <div className="floating-ink-drop works-drop-1"></div>
        <div className="floating-ink-drop works-drop-2"></div>
        <div className="ink-splotch works-splotch-1"></div>
        <div className="ink-splotch works-splotch-2"></div>
      </div>

      <div className="container">
        <div className="works-header">
          <div className="section-badge">
            <IconTarget size={16} />
            <span>How It Works</span>
          </div>
          <h2 className="section-title">Your Journey to the Perfect Tattoo</h2>
          <p className="section-subtitle">
            Whether you're seeking your next piece or growing your artistry, INKD connects the local tattoo community.
          </p>
        </div>
        
        {/* Split Screen Layout */}
        <div className="works-split-container">
          {/* Enthusiast Side - Left */}
          <div className="works-split-side enthusiast-side">
            <div className="works-side-background">
              <img src="/swallow.svg" alt="" className="works-side-tattoo enthusiast-tattoo" />
            </div>
            <div className="works-side-content">
              <div className="works-side-header">
                <h3 className="works-side-title">For Tattoo Enthusiasts</h3>
                <p className="works-side-subtitle">Your journey to the perfect local tattoo experience</p>
              </div>
              
              <div className="works-steps-container">
                {enthusiastSteps.map((step, index) => (
                  <div key={index} className="works-step">
                    <div className="works-step-number">{step.number}</div>
                    <div className="works-step-content">
                      <div className="works-step-icon">
                        <step.Icon size={24} />
                      </div>
                      <h4 className="works-step-title">{step.title}</h4>
                      <p className="works-step-description">{step.description}</p>
                    </div>
                    {index < enthusiastSteps.length - 1 && (
                      <div className="works-step-connector">
                        <div className="connector-line"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="works-split-divider">
            <div className="works-divider-line"></div>
            <div className="works-divider-icon">
              <IconSparkles size={24} />
            </div>
          </div>
          
          {/* Artist Side - Right */}
          <div className="works-split-side artist-side">
            <div className="works-side-background">
              <img src="/rose.svg" alt="" className="works-side-tattoo artist-tattoo" />
            </div>
            <div className="works-side-content">
              <div className="works-side-header">
                <h3 className="works-side-title">Your Personal Tattoo Concierge</h3>
                <p className="works-side-subtitle">AI-powered tools to grow your local tattoo business</p>
              </div>
              
              <div className="works-features-container">
                {artistFeatures.map((feature, index) => (
                  <div key={index} className="works-feature-card">
                    <div className="works-feature-icon">
                      <feature.Icon size={24} />
                    </div>
                    <div className="works-feature-content">
                      <h4 className="works-feature-title">{feature.title}</h4>
                      <p className="works-feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;