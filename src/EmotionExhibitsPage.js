import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa';
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
        <div className="top-bar">
          <FaBars className="icon" onClick={openSidebar} />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          {isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} />}
          {!isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} style={{ opacity: 0.6 }} />}
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
      </div>
    </div>
  );
}

export default EmotionExhibitsPage; 