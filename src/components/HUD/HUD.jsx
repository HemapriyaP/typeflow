import React from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/metrics';
import './HUD.css';

export default function HUD() {
  const { timeRemaining, stats, status } = useSelector((s) => s.session);
  const { total, correct, accuracy, wpm } = stats;

  const isLow = timeRemaining <= 60 && status === 'running';

  return (
    <div className="hud">
      <div className={`hud-card hud-timer ${isLow ? 'hud-timer-low' : ''}`}>
        <span className="hud-label">Time Left</span>
        <span className="hud-value hud-mono">{formatTime(timeRemaining)}</span>
        <div className="timer-bar-wrap">
          <div
            className="timer-bar"
            style={{ width: `${(timeRemaining / 300) * 100}%` }}
          />
        </div>
      </div>

      <div className="hud-card">
        <span className="hud-label">Keystrokes</span>
        <span className="hud-value hud-cyan">{total}</span>
        <span className="hud-sub">{correct} correct</span>
      </div>

      <div className="hud-card">
        <span className="hud-label">Accuracy</span>
        <span
          className="hud-value"
          style={{ color: accuracy >= 90 ? '#00f5a0' : accuracy >= 70 ? '#ffd60a' : '#ff4757' }}
        >
          {accuracy}%
        </span>
        <div className="accuracy-bar-wrap">
          <div
            className="accuracy-bar"
            style={{
              width: `${accuracy}%`,
              background: accuracy >= 90 ? '#00f5a0' : accuracy >= 70 ? '#ffd60a' : '#ff4757',
            }}
          />
        </div>
      </div>

      <div className="hud-card">
        <span className="hud-label">WPM</span>
        <span className="hud-value hud-purple">{wpm}</span>
        <span className="hud-sub">words/min</span>
      </div>
    </div>
  );
}
