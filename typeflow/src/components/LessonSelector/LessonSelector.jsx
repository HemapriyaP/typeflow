import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty } from '../../store/settings/settingsSlice';
import './LessonSelector.css';

const LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Simple 2-4 key patterns', icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Mixed patterns & spaces', icon: '⚡' },
  { id: 'advanced', label: 'Advanced', desc: 'Full sequences, real words', icon: '🔥' },
];

export default function LessonSelector({ disabled }) {
  const dispatch = useDispatch();
  const difficulty = useSelector((s) => s.settings.difficulty);

  return (
    <div className="lesson-selector">
      <h3 className="lesson-title">Select Difficulty</h3>
      <div className="lesson-cards">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            id={`difficulty-${level.id}`}
            className={`lesson-card ${difficulty === level.id ? 'active' : ''}`}
            onClick={() => !disabled && dispatch(setDifficulty(level.id))}
            disabled={disabled}
            aria-pressed={difficulty === level.id}
          >
            <span className="lesson-icon">{level.icon}</span>
            <span className="lesson-label">{level.label}</span>
            <span className="lesson-desc">{level.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
