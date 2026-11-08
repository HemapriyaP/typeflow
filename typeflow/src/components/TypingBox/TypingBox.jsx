import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recordKeystroke } from '../../store/session/sessionSlice';
import { FINGER_COLORS } from '../../utils/keyboardConfig';
import './TypingBox.css';

const HOME_KEYS_SET = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);

export default function TypingBox({ onNextKey, onLastResult }) {
  const dispatch = useDispatch();
  const { sequence, currentIndex, status } = useSelector((s) => s.session);
  const difficulty = useSelector((s) => s.settings.difficulty);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const charRefs = useRef([]);

  const isRunning = status === 'running';

  // Auto-focus input when session runs
  useEffect(() => {
    if (isRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRunning]);

  // Scroll current char into view
  useEffect(() => {
    const el = charRefs.current[currentIndex];
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentIndex]);

  // Report next key to parent
  useEffect(() => {
    if (sequence && currentIndex < sequence.length) {
      onNextKey?.(sequence[currentIndex]);
    }
  }, [sequence, currentIndex, onNextKey]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isRunning) return;
      e.preventDefault();

      const key = e.key;
      // Only handle single printable chars
      if (key.length !== 1) return;
      // Only allow home-row keys and space
      if (!HOME_KEYS_SET.has(key) && key !== ' ') return;

      const expected = sequence[currentIndex];
      const correct = key === expected;

      dispatch(recordKeystroke({ char: key, expected, correct, difficulty }));
      onLastResult?.(correct ? 'correct' : 'error');
    },
    [isRunning, sequence, currentIndex, dispatch, difficulty, onLastResult]
  );

  if (!sequence) return null;

  const chars = sequence.split('');

  return (
    <div className="typing-box-wrap">
      <div className="typing-box" ref={containerRef}>
        {/* Hidden input to capture keystrokes */}
        <input
          ref={inputRef}
          className="typing-input"
          onKeyDown={handleKeyDown}
          readOnly
          value=""
          onChange={() => {}}
          aria-label="Typing input"
        />

        <div className="char-display" onClick={() => inputRef.current?.focus()}>
          {chars.map((char, idx) => {
            const fingerColor = FINGER_COLORS[char]?.color;
            let state = 'pending';
            if (idx < currentIndex) state = 'correct';
            if (idx === currentIndex) state = 'active';

            return (
              <span
                key={idx}
                ref={(el) => (charRefs.current[idx] = el)}
                className={`char char-${state} ${char === ' ' ? 'char-space' : ''}`}
                style={
                  state === 'pending' && fingerColor && char !== ' '
                    ? { '--char-color': fingerColor }
                    : {}
                }
              >
                {char === ' ' ? '\u00A0' : char}
                {idx === currentIndex && <span className="cursor-blink" />}
              </span>
            );
          })}
        </div>
      </div>

      <p className="typing-hint">
        {isRunning
          ? 'Click here if keyboard stops working · Only A S D F J K L ; keys active'
          : 'Press Start to begin your 5-minute practice session'}
      </p>
    </div>
  );
}
