import React, { useState, useEffect } from 'react';
import './App.css';

const emotionOptions = [
  { value: 'joy', label: 'Joy', img: process.env.PUBLIC_URL + '/images/joy.png' },
  { value: 'curious', label: 'Curious', img: process.env.PUBLIC_URL + '/images/curious.png' },
  { value: 'amazed', label: 'Amazed', img: process.env.PUBLIC_URL + '/images/amazed.png' },
  { value: 'inspired', label: 'Inspired', img: process.env.PUBLIC_URL + '/images/inspired.png' },
  { value: 'calm', label: 'Calm', img: process.env.PUBLIC_URL + '/images/calm.png' },
  { value: 'rebellious', label: 'Rebellious', img: process.env.PUBLIC_URL + '/images/rebellious.png' },
];

const colorMap = {
  joy: '#fff3cd',
  curious: '#d1ecf1',
  amazed: '#f8d7da',
  inspired: '#e2e3ff',
  calm: '#d4edda',
  rebellious: '#fbe9e7',
};


function ShareThoughts({ theme }) {
  const [thoughtInput, setThoughtInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emotion, setEmotion] = useState('joy');
  const [likeCount, setLikeCount] = useState(0);
  const [thoughts, setThoughts] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('thoughts')) || {};
    setThoughts(saved);
  }, []);


  useEffect(() => {
    if (theme) {
      document.querySelector('.app-container')?.classList.remove('light', 'dark');
      document.querySelector('.app-container')?.classList.add(theme);
    }
  }, [theme]);

  const handleLikeToggle = () => {
    setLikeCount(likeCount === 0 ? 1 : 0);
  };

  const handleSubmit = () => {
    if (!thoughtInput.trim()) {
      alert('Please write something.');
      return;
    }
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    const thoughtObj = {
      text: thoughtInput,
      likes: likeCount,
      name: nameInput || 'Anonymous',
      timestamp,
    };
    const updated = { ...thoughts };
    if (!updated[emotion]) updated[emotion] = [];
    updated[emotion] = [thoughtObj, ...updated[emotion]];
    setThoughts(updated);
    localStorage.setItem('thoughts', JSON.stringify(updated));
    setThoughtInput('');
    setNameInput('');
    setLikeCount(0);
  };


  // Remove local theme toggle, theme is now controlled by parent

  const handleEmotionChange = e => {
    setEmotion(e.target.value);
  };

  useEffect(() => {
    document.getElementById('thoughtInput')?.style.setProperty('--bubble-color', colorMap[emotion]);
  }, [emotion]);

  return (
    <div className="share-thoughts-content">
      <div className="share-title" style={{
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>
        <div className="text-logo" style={{ margin: '0 0 1rem 0' }}>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: theme === 'light' ? '#333' : '#fff',
            letterSpacing: '0.1em',
            textShadow: theme === 'light'
              ? '0 2px 6px rgba(0, 0, 0, 0.2)'
              : '0 2px 8px #0008',
            margin: '0 0 0.2rem 0'
          }}>NUIT BLANCHE</div>
          <div style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#00c3ff',
            letterSpacing: '0.15em',
            textShadow: '0 2px 8px #00c3ff44'
          }}>TORONTO</div>
        </div>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: theme === 'light' ? '#333' : '#fff',
          margin: '0 0 0.5rem 0',
          textShadow: theme === 'light'
            ? '0 2px 6px rgba(0, 0, 0, 0.2)'
            : '0 2px 8px #0008'
        }}>HI GEN/AVATAR</h1>
        <img 
          src={process.env.PUBLIC_URL + '/images/svg/Slider/Group 57.svg'} 
          alt="Avatar" 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            margin: '0.5rem 0'
          }}
        />
      </div>
      
      <div className="inspiration-text" style={{
        textAlign: 'center',
        color: theme === 'light' ? '#666' : '#fff',
        fontSize: '1rem',
        fontWeight: '500',
        margin: '1rem 0',
        opacity: 0.9,
        textShadow: theme === 'light'
          ? '0 1px 3px rgba(0, 0, 0, 0.2)'
          : '0 2px 8px #0008'
      }}>
        Share your thoughts about tonight's art experiences
      </div>

          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: theme === 'light' ? '#333' : '#fff',
            textAlign: 'center',
            margin: '0 0 1.5rem 0',
            textShadow: theme === 'light'
              ? '0 2px 6px rgba(0, 0, 0, 0.2)'
              : '0 2px 8px #0008'
          }}>Share your thoughts</h2>
      <div className="input-section" style={{
        marginBottom: '1.5rem'
      }}>
        <input
          type="text"
          id="nameInput"
          placeholder="Your name (optional)"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: `1px solid ${theme === 'light' ? '#ccc' : '#5b5ba6'}`,
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: '1rem',
            marginBottom: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <div className="chat-bubble-input">
          <textarea
            id="thoughtInput"
            placeholder="Type your thought here..."
            value={thoughtInput}
            onChange={e => setThoughtInput(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #5b5ba6',
              background: colorMap[emotion] || 'rgba(255, 255, 255, 0.1)',
              color: '#333',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div className="form-controls" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: '1rem'
        }}>
          <select 
            id="emotionSelect" 
            value={emotion} 
            onChange={handleEmotionChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #5b5ba6',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '0.9rem',
              flex: 1
            }}
          >
            {emotionOptions.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#23243a', color: '#fff' }}>{opt.label}</option>
            ))}
          </select>
          <button
            id="likeToggle"
            className={likeCount > 0 ? 'liked' : ''}
            type="button"
            onClick={handleLikeToggle}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: likeCount > 0 ? '#ff4757' : 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            ❤️ {likeCount}
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'linear-gradient(90deg, #00c3ff, #4fc3f7)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 12px #00c3ff44',
              textShadow: '0 1px 4px #0008'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 16px #00c3ff66';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px #00c3ff44';
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="emotions-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem',
        '@media (max-width: 575.98px)': {
          gridTemplateColumns: '1fr',
          gap: '0.75rem'
        }
      }}>
        {emotionOptions.map(opt => (
          <div 
            className="emotion-card" 
            key={opt.value}
            style={{
              background: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.08)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: `1px solid ${theme === 'light' ? '#ddd' : '#5b5ba6'}`,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 195, 255, 0.2)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: theme === 'light' ? '#333' : '#fff',
              margin: '0 0 0.75rem 0'
            }}>
              <img src={opt.img} alt={opt.label} style={{ width: '24px', height: '24px' }} /> 
              {opt.label}
            </h3>
            <div className="thoughts-container" style={{
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {thoughts[opt.value]?.map((thought, idx) => (
                <div 
                  className={`thought-item`} 
                  key={idx}
                  style={{
                    background: `linear-gradient(135deg, ${colorMap[opt.value]} 0%, ${colorMap[opt.value]}dd 100%)`,
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    color: '#333',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="thought-text" style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {thought.text}
                  </div>
                  <div className="thought-meta" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    opacity: 0.7
                  }}>
                    <span>– {thought.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{thought.timestamp}</span>
                      <span>❤️ {thought.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
  );
}

export default ShareThoughts;