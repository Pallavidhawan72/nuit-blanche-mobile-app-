import React, { useState, useEffect } from 'react';
import './styles.css';

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

    // Match EmotionExhibitsPage SURPRISE background
    const surpriseBg = {
      background: "linear-gradient(135deg, #ffe082 0%, #fffde7 100%)",
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    return (
      <div className="share-thoughts-center" style={surpriseBg}>
  <div className={`app-container ${theme}`} style={{ borderRadius: 0 }}> 
      <div id="title">
        <h1>HI GEN/AVATAR</h1>
  <img src={process.env.PUBLIC_URL + '/images/svg/Slider/Group 57.svg'} alt="Avatar" className="avatar-image" />
      </div>
      <h2>Share your thoughts</h2>
      <div className="input-box">
        <input
          type="text"
          id="nameInput"
          placeholder="Your name (optional)"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <div className="chat-bubble-input">
          <textarea
            id="thoughtInput"
            placeholder="Type your thought here..."
            value={thoughtInput}
            onChange={e => setThoughtInput(e.target.value)}
            style={{ '--bubble-color': colorMap[emotion] }}
          />
        </div>
        <div className="form-row">
          <select id="emotionSelect" value={emotion} onChange={handleEmotionChange}>
            {emotionOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            id="likeToggle"
            className={likeCount > 0 ? 'liked' : ''}
            type="button"
            onClick={handleLikeToggle}
          >
            ❤️ {likeCount}
          </button>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className="grid">
        {emotionOptions.map(opt => (
          <div className="emotion-box" id={opt.value} key={opt.value}>
            <h3><img src={opt.img} alt={opt.label} height={50} /> {opt.label}</h3>
            <div className="scroll-container">
              <div className="scroll-track thoughts">
                {thoughts[opt.value]?.map((thought, idx) => (
                  <div className={`thought-bubble ${opt.value}`} key={idx}>
                    <div className="bubble-text">{thought.text}</div>
                    <div className="meta">
                      <span className="name">– {thought.name}</span>
                      <span className="timestamp">{thought.timestamp}</span>
                    </div>
                    <div className="like-count">❤️ {thought.likes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ShareThoughts;
