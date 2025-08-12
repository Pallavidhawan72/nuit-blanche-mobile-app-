import React, { useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaChevronDown, FaChevronUp, FaRegSmile, FaRegLightbulb, FaRegHandPointUp, FaRegComments, FaRegClock } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import logo from './logo.svg';
import EmotionExhibitsPage from './EmotionExhibitsPage';
import ShareThoughtsPage from './ShareThoughtsPage';

const steps = [
  { title: 'Choose Your Emotion', icon: <FaRegSmile /> },
  { title: 'Get Your Glowing Band', icon: <FaRegLightbulb /> },
  { title: 'Tap to Share Feelings', icon: <FaRegHandPointUp /> },
  { title: 'Connect & Explore', icon: <FaRegComments /> },
  { title: 'Relive the Night', icon: <FaRegClock /> },
];

const carouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    alt: 'Art Installation 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    alt: 'Art Installation 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    alt: 'Art Installation 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    alt: 'Art Installation 4',
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    alt: 'Art Installation 5',
  },
];

function ThemeToggle({ theme, setTheme }) {
  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={theme === 'light'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <span className="slider" />
      <span className="theme-label">{theme === 'dark' ? '🌙' : '☀️'}</span>
    </label>
  );
}

function Sidebar({ open, onClose, theme, setTheme }) {
  return (
    <>
      <div className={`sidebar-drawer${open ? ' open' : ''}`}>
        <button className="sidebar-close" onClick={onClose}>&times;</button>
        <div className="sidebar-content">
          <h3>Settings</h3>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
      {open && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
}

function ProfileDrawer({ open, onClose, name, setName, email, setEmail, onLogout }) {
  const drawerRef = useRef();
  return (
    <>
      <div className={`profile-drawer${open ? ' open' : ''}`} ref={drawerRef}>
        <button className="profile-close" onClick={onClose}>&times;</button>
        <div className="profile-content">
          <div className="profile-pic">
            <FaUserCircle size={60} />
          </div>
          <div className="profile-fields">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <button className="profile-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
      {open && <div className="profile-overlay" onClick={onClose}></div>}
    </>
  );
}

function LoginModal({ open, onClose, onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onLogin(email, password);
  };
  const bgStyle = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/images/starry-night-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100vw',
    height: '100vh',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1202,
    overflow: 'hidden',
  };
  return open ? (
    <>
      <div className="login-modal" style={bgStyle}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(35,36,58,0.72)', opacity: 0.7, zIndex: 0 }} />
        <div className="login-logo-text" style={{ position: 'relative', zIndex: 1 }}>
          <div className="nb-logo-main">NUIT BLANCHE</div>
          <div className="nb-logo-toronto">TORONTO</div>
        </div>
        <form className="login-form" onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
          <h3>Login</h3>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@email.com" />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
      <div className="login-overlay" onClick={onClose}></div>
    </>
  ) : null;
}

function LandingPage({ theme, setTheme, openSidebar, openProfile, isLoggedIn }) {
  const [openStep, setOpenStep] = useState(null);
  const navigate = useNavigate();
  // Example icons for steps
  const stepIcons = [
    <FaRegSmile />, <FaRegLightbulb />, <FaRegHandPointUp />, <FaRegComments />, <FaRegClock />
  ];
  return (
    <div className="landing-bg">
      <div className="landing-container advanced">
        <div className="top-bar">
          <FaBars className="icon" onClick={openSidebar} />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          {isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} />}
          {!isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} style={{ opacity: 0.6 }} />}
        </div>
        <div className="welcome-section">
          <div className="landing-welcome-wrap">
            <div className="welcome-text">Welcome to</div>
            <div className="text-logo">
              <div className="nb-logo-main">NUIT BLANCHE</div>
              <div className="nb-logo-toronto">TORONTO</div>
            </div>
          </div>
        </div>
        <div className="carousel advanced-carousel">
          <div className="carousel-animated-gradient" />
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3500}
            showArrows={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => (
              <span
                key={index}
                className={`dot${isSelected ? ' active' : ''}`}
                onClick={onClickHandler}
                aria-label={`${label} ${index + 1}`}
              />
            )}
          >
            {carouselImages.map((img, idx) => (
              <div key={idx} className="carousel-img-wrapper">
                <img src={img.src} alt={img.alt} className="carousel-img" />
                <div className="carousel-gradient" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="subtitle">Find your journey with Emotion Spectrum</div>
        <button className="start-btn advanced-btn" onClick={() => navigate('/emotion')}>START NOW</button>
        <div className="how-it-works">
          <h2>HOW IT WORKS</h2>
          <div className="steps">
            {steps.map((step, idx) => (
              <div key={idx} className={`step${openStep === idx ? ' open' : ''}`}> 
                <div
                  className="step-header"
                  onClick={() => setOpenStep(openStep === idx ? null : idx)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={openStep === idx}
                >
                  <span className="step-title">{stepIcons[idx]} {step.title}</span>
                  {openStep === idx ? (
                    <FaChevronUp className="chevron" />
                  ) : (
                    <FaChevronDown className="chevron" />
                  )}
                </div>
                <div
                  className="step-content"
                  style={{ maxHeight: openStep === idx ? '120px' : '0', opacity: openStep === idx ? 1 : 0 }}
                >
                  {openStep === idx && (
                    <p>Details about "{step.title}" will go here.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-shape bg-shape1"></div>
      <div className="bg-shape bg-shape2"></div>
    </div>
  );
}

function EmotionSelectPage({ theme, setTheme, openSidebar, openProfile, isLoggedIn }) {
  const emotions = [
    { name: 'JOY', color: '#4fc3f7', img: process.env.PUBLIC_URL + '/images/joy.png' },
    { name: 'CURIOUS', color: '#a084ca', img: process.env.PUBLIC_URL + '/images/curious.png' },
    { name: 'INSPIRED', color: '#90caf9', img: process.env.PUBLIC_URL + '/images/inspired.png' },
    { name: 'CALM', color: '#b2dfdb', img: process.env.PUBLIC_URL + '/images/calm.png' },
    { name: 'AMAZED', color: '#b2ff59', img: process.env.PUBLIC_URL + '/images/amazed.png' },
    { name: 'REBELLIOUS', color: '#ffb74d', img: process.env.PUBLIC_URL + '/images/rebellious.png' },
    { name: 'SURPRISE ME', color: '#ffe082', img: process.env.PUBLIC_URL + '/images/suprise.png' },
  ];
  const [selected, setSelected] = useState(null);
  const [hasBand, setHasBand] = useState(null);
  const subtitle = 'Explore how you feel when you choose to go against the grain.';
  const navigate = useNavigate();
  return (
    <div className="landing-bg" style={{
      backgroundImage: `url('${process.env.PUBLIC_URL}/images/starry-night-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'rgba(35,36,58,0.4)', 
        zIndex: 0 
      }} />
      <div className="landing-container advanced emotion-select-page" style={{ position: 'relative', zIndex: 1 }}>
        <div className="top-bar">
          <FaBars className="icon" onClick={openSidebar} />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          {isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} />}
          {!isLoggedIn && <FaUserCircle className="icon" onClick={openProfile} style={{ opacity: 0.6 }} />}
        </div>
        <div className="emotion-title">Tonight I want to feel...</div>
        <div className="emotion-band-section">
          <div className="emotion-band-label">Do you have a Spectrum Band ?</div>
          <div className="emotion-band-options">
            <label className={`emotion-band-radio${hasBand === true ? ' selected' : ''}`}>
              <input type="radio" name="band" checked={hasBand === true} onChange={() => setHasBand(true)} /> Yes
            </label>
            <label className={`emotion-band-radio${hasBand === false ? ' selected' : ''}`}>
              <input type="radio" name="band" checked={hasBand === false} onChange={() => setHasBand(false)} /> No
            </label>
          </div>
          <div className="band-image-container">
            <img src={process.env.PUBLIC_URL + '/images/band.png'} alt="Spectrum Band" className="band-image" />
          </div>
        </div>
        <div className="section-separator">
          <div className="separator-line"></div>
          <div className="separator-line"></div>
        </div>
        <div className="emotion-grid-bg">
          <div className="emotion-grid">
            <div className="emotion-row">
              <div className="emotion-item" onClick={() => navigate(`/emotion/JOY`)} style={{ opacity: selected === 0 ? 1 : 0.85 }}>
                <img src={emotions[0].img} alt={emotions[0].name} className="emotion-img" />
                <div className="emotion-pill" style={{ boxShadow: `0 4px 24px ${emotions[0].color}44` }}>
                  <span className="emotion-pill-icon">⭐</span>
                  <span className="emotion-pill-title" style={{ color: emotions[0].color }}>{emotions[0].name}</span>
                  <span className="emotion-pill-sub">{subtitle}</span>
                </div>
              </div>
            </div>
            <div className="emotion-row">
              {[1,2].map(idx => (
                <div className="emotion-item" key={idx} onClick={() => navigate(`/emotion/${emotions[idx].name}`)} style={{ opacity: selected === idx ? 1 : 0.85 }}>
                  <img src={emotions[idx].img} alt={emotions[idx].name} className="emotion-img" />
                  <div className="emotion-pill" style={{ boxShadow: `0 4px 24px ${emotions[idx].color}44` }}>
                    <span className="emotion-pill-icon">⭐</span>
                    <span className="emotion-pill-title" style={{ color: emotions[idx].color }}>{emotions[idx].name}</span>
                    <span className="emotion-pill-sub">{subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="emotion-row">
              {[3,4].map(idx => (
                <div className="emotion-item" key={idx} onClick={() => navigate(`/emotion/${emotions[idx].name}`)} style={{ opacity: selected === idx ? 1 : 0.85 }}>
                  <img src={emotions[idx].img} alt={emotions[idx].name} className="emotion-img" />
                  <div className="emotion-pill" style={{ boxShadow: `0 4px 24px ${emotions[idx].color}44` }}>
                    <span className="emotion-pill-icon">⭐</span>
                    <span className="emotion-pill-title" style={{ color: emotions[idx].color }}>{emotions[idx].name}</span>
                    <span className="emotion-pill-sub">{subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="emotion-row">
              {[5,6].map(idx => (
                <div className="emotion-item" key={idx} onClick={() => navigate(`/emotion/${emotions[idx].name}`)} style={{ opacity: selected === idx ? 1 : 0.85 }}>
                  <img src={emotions[idx].img} alt={emotions[idx].name} className="emotion-img" />
                  <div className="emotion-pill" style={{ boxShadow: `0 4px 24px ${emotions[idx].color}44` }}>
                    <span className="emotion-pill-icon">⭐</span>
                    <span className="emotion-pill-title" style={{ color: emotions[idx].color }}>{emotions[idx].name}</span>
                    <span className="emotion-pill-sub">{subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="emotion-progress-section">
          <div className="emotion-progress-label">Choose one of the EMOTION to begin.</div>
          <div className="emotion-progress-bar">
            <div className="emotion-progress-dot" style={{ left: selected !== null ? `${(selected/6)*100}%` : '0%' }} />
            <div className="emotion-progress-track" />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (emailInput, password) => {
    if (emailInput && password) {
      setIsLoggedIn(true);
      setEmail(emailInput);
      setName('John Doe');
      setLoginOpen(false);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };
  const handleLogout = () => {
    setName('');
    setEmail('');
    setIsLoggedIn(false);
    setProfileOpen(false);
    setLoginOpen(true);
  };
  if (!isLoggedIn) {
    return (
      <div className={`app-root theme-${theme}`}>
        <LoginModal open={true} onClose={() => {}} onLogin={handleLogin} error={loginError} />
      </div>
    );
  }
  return (
    <div className={`app-root theme-${theme}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} setTheme={setTheme} />
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} name={name} setName={setName} email={email} setEmail={setEmail} onLogout={handleLogout} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} />} />
          <Route path="/emotion" element={<EmotionSelectPage theme={theme} setTheme={setTheme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} />} />
          <Route path="/emotion/:emotionName" element={<EmotionExhibitsPage theme={theme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} />} />
          <Route path="/share-thoughts" element={<ShareThoughtsPage theme={theme} setTheme={setTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
