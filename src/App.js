import React, { useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronUp, FaRegSmile, FaRegLightbulb, FaRegHandPointUp, FaRegComments, FaRegClock, FaUserCircle, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import logo from './logo.svg';
import EmotionExhibitsPage from './EmotionExhibitsPage';
import ShareThoughtsPage from './ShareThoughtsPage';

const steps = [
  { 
    title: 'Choose Your Emotion', 
    icon: <FaRegSmile />, 
    content: 'Details about "Choose Your Emotion" will go here.' 
  },
  { 
    title: 'Get Your Glowing Band', 
    icon: <FaRegLightbulb />, 
    content: 'Receive your personalized glowing wristband that connects to your chosen emotion.' 
  },
  { 
    title: 'Tap to Share Feelings', 
    icon: <FaRegHandPointUp />, 
    content: 'Share your emotional experience by tapping your band with others.' 
  },
  { 
    title: 'Connect & Explore', 
    icon: <FaRegComments />, 
    content: 'Discover art installations and connect with people who share similar emotions.' 
  },
  { 
    title: 'Relive the Night', 
    icon: <FaRegClock />, 
    content: 'Review your journey and connections made throughout the night.' 
  },
];

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
          onClick={() => {
            console.log('Back button clicked');
            onBack && onBack();
          }}
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
        onClick={() => {
          console.log('Home button clicked');
          onHome && onHome();
        }}
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
          onClick={() => {
            console.log('Next button clicked');
            onNext && onNext();
          }}
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

function LandingPage({ theme, setTheme, openSidebar, openProfile, isLoggedIn, handleLogout }) {
  const [openStep, setOpenStep] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
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
  // Example icons for steps
  const stepIcons = [
    <FaRegSmile />, <FaRegLightbulb />, <FaRegHandPointUp />, <FaRegComments />, <FaRegClock />
  ];
  return (
    <div className="landing-bg">
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
                opacity: 0.6,
                cursor: 'pointer',
                color: theme === 'light' ? '#333' : '#fff'
              }}
              onClick={() => setProfileOpen(!profileOpen)}
            />
            <ProfileDropdown 
              open={profileOpen} 
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogoutClick}
              theme={theme}
            />
          </div>
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
        <div className="carousel advanced-carousel" style={{
          margin: '2rem 0',
          borderRadius: '1.2rem',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(225, 0, 255, 0.3)',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="carousel-animated-gradient" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(45deg, rgba(0, 195, 255, 0.1), rgba(225, 0, 255, 0.1))',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
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
                style={{
                  background: isSelected ? 'linear-gradient(90deg, #00eaff, #4fc3f7)' : 'rgba(255, 255, 255, 0.4)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  margin: '0 4px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: isSelected ? '0 0 12px rgba(0, 234, 255, 0.6)' : 'none',
                  transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            )}
          >
            {carouselImages.map((img, idx) => (
              <div key={idx} className="carousel-img-wrapper" style={{ position: 'relative' }}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="carousel-img" 
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    filter: 'brightness(0.8) contrast(1.2) saturate(1.1)'
                  }}
                />
                <div className="carousel-gradient" style={{
                  position: 'absolute',
                  left: 0, right: 0, bottom: 0, top: 0,
                  background: 'linear-gradient(180deg, rgba(30, 32, 54, 0.2) 0%, rgba(225, 0, 255, 0.3) 100%)',
                  zIndex: 2
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                  zIndex: 3
                }}>
                  {img.alt}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="subtitle" style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: theme === 'light' ? '#333' : '#fff',
          textAlign: 'center',
          margin: '1.5rem 0',
          textShadow: theme === 'light' 
            ? '0 1px 3px rgba(0, 0, 0, 0.2)' 
            : '0 2px 8px rgba(0, 0, 0, 0.6)',
          opacity: 0.95,
          lineHeight: '1.4'
        }}>
          Discover Toronto's art installations and connect through emotions
        </div>
        <div style={{
          textAlign: 'center',
          color: theme === 'light' ? '#00a3d9' : '#00c3ff',
          fontSize: '0.95rem',
          fontWeight: '500',
          margin: '0.5rem 0 2rem 0',
          opacity: 0.9,
          textShadow: theme === 'light'
            ? '0 1px 3px rgba(0, 163, 217, 0.3)'
            : '0 2px 8px rgba(0, 195, 255, 0.4)'
        }}>
          Experience Nuit Blanche like never before
        </div>
        <button 
          className="start-btn advanced-btn" 
          onClick={() => navigate('/emotion')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '50px',
            padding: '1.2rem 3rem',
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: '1.5rem 0',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(102, 126, 234, 0.6), 0 8px 24px rgba(118, 75, 162, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
            e.currentTarget.style.filter = 'brightness(1.1) saturate(1.2)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.filter = 'brightness(1) saturate(1)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✨ START YOUR JOURNEY
          </span>
        </button>
        <div className="how-it-works" style={{
          marginTop: '2rem',
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(44, 44, 66, 0.95)',
          borderRadius: '1.2rem',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          width: '100%',
          maxWidth: '400px',
          margin: '2rem auto 1.5rem auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 0 1.5rem 0',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
            letterSpacing: '0.02em',
            lineHeight: '1.2',
            width: '100%'
          }}>HOW IT<br/>WORKS</h2>
          <div className="steps" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            width: '100%',
            alignItems: 'center'
          }}>
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`step${openStep === idx ? ' open' : ''}`}
                style={{
                  background: 'rgba(70, 70, 90, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  width: '100%',
                  maxWidth: '350px',
                  marginBottom: '0.8rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  alignSelf: 'center'
                }}
              > 
                <div
                  className="step-header"
                  onClick={() => setOpenStep(openStep === idx ? null : idx)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={openStep === idx}
                  style={{
                    padding: '1.2rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.parentElement.style.background = 'rgba(80, 80, 100, 0.9)';
                    e.currentTarget.parentElement.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.parentElement.style.background = 'rgba(70, 70, 90, 0.8)';
                    e.currentTarget.parentElement.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="step-title" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                    flex: 1
                  }}>
                    <span style={{ 
                      color: '#00c3ff', 
                      fontSize: '1.3rem',
                      minWidth: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>{stepIcons[idx]}</span>
                    {step.title}
                  </span>
                  {openStep === idx ? (
                    <FaChevronUp className="chevron" style={{ 
                      color: '#00c3ff', 
                      fontSize: '1.1rem',
                      transition: 'all 0.2s ease'
                    }} />
                  ) : (
                    <FaChevronDown className="chevron" style={{ 
                      color: '#00c3ff', 
                      fontSize: '1.1rem',
                      transition: 'all 0.2s ease'
                    }} />
                  )}
                </div>
                <div
                  className="step-content"
                  style={{ 
                    maxHeight: openStep === idx ? '150px' : '0', 
                    opacity: openStep === idx ? 1 : 0,
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    background: 'rgba(50, 50, 70, 0.6)',
                    borderTop: openStep === idx ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}
                >
                  {openStep === idx && (
                    <p style={{
                      padding: '1.2rem 1.4rem',
                      margin: 0,
                      color: '#ffffff',
                      opacity: 0.85,
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)'
                    }}>
                      {step.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation 
        onBack={() => {
          console.log('Back clicked on landing page');
          window.history.back();
        }}
        onHome={() => {
          console.log('Home clicked on landing page');
          navigate('/');
        }}
        onNext={() => {
          console.log('Next clicked on landing page');
          navigate('/emotion');
        }}
        showBack={false}
      />
    </div>
  );
}

function EmotionSelectPage({ theme, setTheme, openSidebar, openProfile, isLoggedIn, handleLogout }) {
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
  const [profileOpen, setProfileOpen] = useState(false);
  const subtitle = 'Explore how you feel when you choose to go against the grain.';
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
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
                opacity: 0.6,
                cursor: 'pointer',
                color: theme === 'light' ? '#333' : '#fff'
              }}
              onClick={() => setProfileOpen(!profileOpen)}
            />
            <ProfileDropdown 
              open={profileOpen} 
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogoutClick}
              theme={theme}
            />
          </div>
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
      <BottomNavigation 
        onBack={() => navigate('/')}
        onHome={() => navigate('/')}
        onNext={() => {
          if (selected !== null) {
            const emotionName = emotions[selected].name.toLowerCase().replace(' ', '-');
            navigate(`/emotion/${emotionName}`);
          }
        }}
        showNext={selected !== null}
      />
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
          <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/emotion" element={<EmotionSelectPage theme={theme} setTheme={setTheme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/emotion/:emotionName" element={<EmotionExhibitsPage theme={theme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} />} />
          <Route path="/share-thoughts" element={<ShareThoughtsPage theme={theme} setTheme={setTheme} openSidebar={() => setSidebarOpen(true)} openProfile={() => setProfileOpen(true)} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
