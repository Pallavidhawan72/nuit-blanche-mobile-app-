import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import logo from './logo.svg';

const exhibitsByEmotion = {
  JOY: [
    'Dancing Lights',
    'Color Splash',
    'Laughing Mirrors',
    'Joyful Beats',
    'Euphoria Lane',
  ],
  CURIOUS: [
    'Mystery Maze',
    'Hidden Whispers',
    'Puzzle Portals',
    'Curiosity Cabinet',
    'Secret Signals',
  ],
  INSPIRED: [
    'Music for the Eyes',
    'Vibes Inside Out',
    'Mona Lee\'sa',
    '100 Nights Alone',
    'Relive the Night',
  ],
  CALM: [
    'Silent Streams',
    'Tranquil Tides',
    'Gentle Glow',
    'Peaceful Paths',
    'Serenity Space',
  ],
  AMAZED: [
    'Starlit Wonders',
    'Infinite Illusions',
    'Amazement Arcade',
    'Wonder Walls',
    'Surprise Spectrum',
  ],
  REBELLIOUS: [
    'Break the Rules',
    'Wild Walls',
    'Unruly Colors',
    'Defiant Designs',
    'Rebel Rhythms',
  ],
  'SURPRISE ME': [
    'Unexpected Turns',
    'Mystery Guest',
    'Secret Show',
    'Random Revels',
    'Surprise Spectrum',
  ],
};

function EmotionExhibitsPage({ theme, openSidebar, openProfile, isLoggedIn }) {
  const { emotionName } = useParams();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Navigate back to login/main page
    navigate('/');
    setProfileOpen(false);
  };

  function ProfileDropdown({ open, onClose, onLogout, theme }) {
    const isDark = theme === 'dark';
    return (
      <>
        {open && (
          <div 
            className="profile-dropdown"
            style={{
              position: 'absolute',
              top: '60px',
              right: '0px',
              background: isDark ? 'rgba(30, 32, 54, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0.8rem',
              padding: '1rem',
              minWidth: '180px',
              boxShadow: isDark 
                ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
                : '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <FaUserCircle size={40} style={{ 
                color: '#00c3ff', 
                marginBottom: '0.5rem' 
              }} />
              <span style={{ 
                color: isDark ? '#fff' : '#333', 
                fontSize: '0.9rem', 
                fontWeight: '500',
                textShadow: isDark 
                  ? '0 1px 4px rgba(0, 0, 0, 0.5)' 
                  : '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}>
                User Profile
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(90deg, #e100ff, #c640d8)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(225, 0, 255, 0.3)',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #ff20ff, #e055ff)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #e100ff, #c640d8)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Logout
            </button>
          </div>
        )}
        {open && (
          <div 
            className="profile-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              zIndex: 999
            }}
            onClick={onClose}
          />
        )}
      </>
    );
  }

  function BottomNavigation({ onBack, onHome, onNext, showBack = true, showNext = true }) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(44, 44, 66, 0.95)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Back Button */}
        {showBack ? (
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaArrowLeft size={18} />
          </button>
        ) : (
          <div style={{ width: '48px' }}></div>
        )}

        {/* Home Button */}
        <button
          onClick={onHome}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#ffffff',
            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
          }}
        >
          <FaHome size={20} />
        </button>

        {/* Next Button */}
        {showNext ? (
          <button
            onClick={onNext}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaArrowRight size={18} />
          </button>
        ) : (
          <div style={{ width: '48px' }}></div>
        )}
      </div>
    );
  }

  // Remove automatic redirect. Add button for user action below.
  const exhibits = exhibitsByEmotion[emotionName?.toUpperCase()] || [
    'Exhibit 1',
    'Exhibit 2',
    'Exhibit 3',
    'Exhibit 4',
    'Exhibit 5',
  ];
  const [selectedExhibits, setSelectedExhibits] = useState([0, 1]); // demo: first two selected
  const [visited, setVisited] = useState([0, 1]); // demo: first two visited

  // Define colors for each emotion
  const emotionColors = {
    'JOY': '#4fc3f7',
    'CURIOUS': '#a084ca', 
    'INSPIRED': '#90caf9',
    'CALM': '#b2dfdb',
    'AMAZED': '#b2ff59',
    'REBELLIOUS': '#ffb74d',
    'SURPRISE ME': '#ffe082',
  };

  const currentEmotionColor = emotionColors[emotionName?.toUpperCase()] || '#ffb74d';

  const handleSelect = idx => {
    if (selectedExhibits.includes(idx)) {
      // Remove from selection if already selected
      setSelectedExhibits(selectedExhibits.filter(i => i !== idx));
    } else {
      // Add to selection if not selected
      setSelectedExhibits([...selectedExhibits, idx]);
    }
    
    if (!visited.includes(idx)) {
      setVisited([...visited, idx]);
    }
  };

  return (
    <div className="exhibits-page-bg">
      <div className="landing-container advanced">
        <div className="top-bar" style={{ position: 'relative' }}>
          <FaBars 
            className="icon" 
            onClick={openSidebar}
            style={{ color: theme === 'light' ? '#333' : '#fff' }}
          />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          <div style={{ position: 'relative' }}>
            <FaUserCircle 
              className="icon" 
              style={{ 
                opacity: isLoggedIn ? 0.85 : 0.6,
                cursor: 'pointer',
                color: theme === 'light' ? '#333' : '#fff'
              }}
              onClick={() => setProfileOpen(!profileOpen)}
            />
            <ProfileDropdown 
              open={profileOpen} 
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogout}
              theme={theme}
            />
          </div>
        </div>
        <div className="google-maps-section">
          <img src={process.env.PUBLIC_URL + '/images/googlemaps.jpg'} alt="Google Maps" className="google-maps-image" />
        </div>
        <div className="exhibits-container">
          <div className="exhibits-header">
            <div className="exhibits-title">Choose one of the EMOTION to begin.</div>
            <div className="exhibits-selected">YOU'VE SELECTED <span 
              className="exhibits-emotion"
              style={{
                background: `linear-gradient(45deg, ${currentEmotionColor}, ${currentEmotionColor}dd)`,
                boxShadow: `0 4px 12px ${currentEmotionColor}66`
              }}
            >{emotionName?.toUpperCase()}</span></div>
          </div>
          <div className="exhibits-list-section">
            <div className="exhibits-list-title">
              <span className="exhibits-list-bold">5 EXHIBITS</span> <span className="exhibits-list-bold">{selectedExhibits.length} SELECTED</span>
            </div>
            <div className="exhibits-list">
              {exhibits.map((ex, idx) => (
                <div
                  className="exhibit-row"
                  key={ex}
                  onClick={() => handleSelect(idx)}
                  role="checkbox"
                  aria-checked={selectedExhibits.includes(idx)}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelect(idx); }}
                >
                  <span className="exhibit-name">“{ex}”</span>
                  <span className="exhibit-radio">
                    <span 
                      className={`exhibit-radio-custom ${selectedExhibits.includes(idx) ? 'selected' : ''}`}
                      style={{
                        borderColor: `${currentEmotionColor}cc`,
                        boxShadow: selectedExhibits.includes(idx) ? `0 0 16px ${currentEmotionColor}66` : undefined,
                        background: selectedExhibits.includes(idx) ? `linear-gradient(45deg, ${currentEmotionColor}, ${currentEmotionColor}dd)` : undefined
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button
            style={{
              background: currentEmotionColor,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${currentEmotionColor}44`,
              zIndex: 9999,
              position: 'relative'
            }}
            onClick={() => {
              console.log('Button clicked! Navigating to share-thoughts...');
              navigate('/share-thoughts');
            }}
          >
            Share Your Thoughts
          </button>
        </div>
      </div>
      <BottomNavigation 
        onBack={() => navigate('/emotion')}
        onHome={() => navigate('/')}
        onNext={() => navigate('/share-thoughts')}
      />
    </div>
  );
}

export default EmotionExhibitsPage;