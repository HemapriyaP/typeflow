import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const status = useSelector((s) => s.session.status);
  const stats = useSelector((s) => s.session.stats);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">⌨️</span>
          <span className="logo-text">Type<span className="logo-flow">Flow</span></span>
        </button>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/practice"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Practice
            {status === 'running' && <span className="nav-live-dot" title="Session running" />}
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Results
          </NavLink>
        </div>

        {/* Live mini-stats in navbar when session running */}
        {(status === 'running' || status === 'paused') && (
          <div className="navbar-live">
            <span className="live-badge">LIVE</span>
            <span className="live-stat">{stats.accuracy}% acc</span>
            <span className="live-sep">·</span>
            <span className="live-stat">{stats.wpm} wpm</span>
          </div>
        )}
      </div>
    </nav>
  );
}
