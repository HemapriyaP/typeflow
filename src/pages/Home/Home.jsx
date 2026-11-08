import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HOME_KEYS = ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Background particles */}
      <div className="home-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bg-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="home-content">
        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">Touch Typing Trainer</div>
          <h1 className="hero-title">
            Master
            <span className="hero-gradient"> Touch Typing</span>
            <br />
            in Minutes a Day
          </h1>
          <p className="hero-desc">
            Train your fingers on the 8 essential home-row keys. Build muscle memory,
            boost accuracy, and increase speed — all in a 5-minute daily session.
          </p>

          {/* Animated home keys display */}
          <div className="hero-keys">
            {HOME_KEYS.map((key, i) => (
              <div
                key={key}
                className="hero-key"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                {key}
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button
              id="start-practice-btn"
              className="btn-primary"
              onClick={() => navigate('/practice')}
            >
              Start Practicing
              <span className="btn-arrow">→</span>
            </button>
            <button
              id="view-history-btn"
              className="btn-secondary"
              onClick={() => navigate('/results')}
            >
              View History
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⌨️</div>
            <h3>Visual Keyboard</h3>
            <p>See exactly which finger to use for each key with real-time highlighting</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>5-Minute Sessions</h3>
            <p>Focused practice windows that measure your keystrokes and accuracy</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your WPM, accuracy, and per-key performance over time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>3 Difficulty Levels</h3>
            <p>Progress from simple patterns to complex sequences as you improve</p>
          </div>
        </div>

        {/* Key guide */}
        <div className="key-guide">
          <h2 className="key-guide-title">The Home Row</h2>
          <p className="key-guide-desc">
            Your fingers naturally rest on these 8 keys. Learning them unlocks the entire keyboard.
          </p>
          <div className="key-guide-grid">
            <div className="key-group left">
              <div className="key-group-label">Left Hand</div>
              {[
                { key: 'A', finger: 'Pinky', color: '#ff6b9d' },
                { key: 'S', finger: 'Ring', color: '#c77dff' },
                { key: 'D', finger: 'Middle', color: '#5b8dee' },
                { key: 'F', finger: 'Index', color: '#00d4ff' },
              ].map(({ key, finger, color }) => (
                <div key={key} className="guide-key" style={{ '--color': color }}>
                  <span className="guide-key-char">{key}</span>
                  <span className="guide-key-finger">{finger}</span>
                </div>
              ))}
            </div>
            <div className="hand-divider">↔</div>
            <div className="key-group right">
              <div className="key-group-label">Right Hand</div>
              {[
                { key: 'J', finger: 'Index', color: '#00f5a0' },
                { key: 'K', finger: 'Middle', color: '#ffd60a' },
                { key: 'L', finger: 'Ring', color: '#ff9500' },
                { key: ';', finger: 'Pinky', color: '#ff4757' },
              ].map(({ key, finger, color }) => (
                <div key={key} className="guide-key" style={{ '--color': color }}>
                  <span className="guide-key-char">{key}</span>
                  <span className="guide-key-finger">{finger}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
