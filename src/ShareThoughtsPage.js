

import React, { useState, useRef } from 'react';
import ShareThoughts from './ShareThoughts';
import { FaBars, FaUserCircle, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';

function ShareThoughtsPage({ theme, setTheme, sidebarOpen, setSidebarOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Navigate back to login/main page
    navigate('/');
    setProfileOpen(false);
  };

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

  return (
    <div className={`app-root theme-${theme}`} style={{ 
      minHeight: '100vh', 
      background: theme === 'light' ? '#f2f2f2' : '#23243a',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '1rem'
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} setTheme={setTheme} />
      <div className="landing-container advanced" style={{
        background: theme === 'light' 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(30, 32, 54, 0.82)',
        borderRadius: '1.5rem',
        padding: '1.2rem',
        maxWidth: '430px',
        width: '100%',
        minHeight: 'auto',
        boxShadow: theme === 'light'
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
          : '0 8px 32px 0 #23235a33',
        display: 'flex',
        flexDirection: 'column',
        border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
        '@media (max-width: 575.98px)': {
          padding: '0.75rem',
          borderRadius: '1rem',
          margin: '0.5rem'
        }
      }}> 
        <div className="top-bar" style={{ 
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0',
          position: 'relative'
        }}>
          <FaBars 
            className="icon" 
            onClick={() => setSidebarOpen(true)}
            style={{ color: theme === 'light' ? '#333' : '#fff' }}
          />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          <div style={{ position: 'relative' }}>
            <FaUserCircle 
              className="icon" 
              style={{ 
                opacity: 0.85, 
                cursor: 'pointer',
                color: theme === 'light' ? '#333' : '#fff',
                fontSize: '1.5rem'
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
        <ShareThoughts theme={theme} />
      </div>
      <BottomNavigation 
        onBack={() => navigate('/emotion')}
        onHome={() => navigate('/')}
        onNext={() => navigate('/')}
        showNext={false}
      />
    </div>
  );
}

export default ShareThoughtsPage;
