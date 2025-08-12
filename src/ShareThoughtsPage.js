

import React from 'react';
import ShareThoughts from './ShareThoughts';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import logo from './logo.svg';

function ShareThoughtsPage({ theme, setTheme, sidebarOpen, setSidebarOpen }) {
  // Sidebar and theme toggle copied from App.js
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
    <div className={`app-root theme-${theme}`} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} setTheme={setTheme} />
      <div className={`app-container ${theme}`}> 
        <div className="top-bar">
          <FaBars className="icon" onClick={() => setSidebarOpen(true)} />
          <img src={logo} alt="Nuit Blanche Toronto" className="nb-logo" />
          <FaUserCircle className="icon" style={{ opacity: 0.6 }} />
        </div>
        <ShareThoughts theme={theme} />
      </div>
    </div>
  );
}

export default ShareThoughtsPage;
