import React from 'react';
import { KEYBOARD_ROWS, FINGER_COLORS } from '../../utils/keyboardConfig';
import './Keyboard.css';

const WIDE_KEYS = new Set(['Backspace', 'Tab', 'CapsLock', 'Enter', 'Shift', 'Ctrl', 'Alt', ' ']);

export default function Keyboard({ nextKey, lastResult }) {
  const normalizedNext = nextKey === ';' ? ';' : nextKey?.toLowerCase();

  return (
    <div className="keyboard-wrap">
      <div className="keyboard">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className={`keyboard-row row-${rowIdx}`}>
            {row.map((key, keyIdx) => {
              const keyLower = key.toLowerCase();
              const isHomeKey = key in FINGER_COLORS;
              const isNext = keyLower === normalizedNext || key === normalizedNext;
              const isError = lastResult === 'error' && isNext;
              const fingerInfo = FINGER_COLORS[key] || FINGER_COLORS[keyLower];
              const isWide = WIDE_KEYS.has(key);

              return (
                <div
                  key={`${rowIdx}-${keyIdx}`}
                  className={[
                    'key',
                    isHomeKey ? 'home-key' : '',
                    isNext ? 'next-key' : '',
                    isError ? 'error-key' : '',
                    isWide ? 'wide-key' : '',
                    key === ' ' ? 'space-key' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    '--finger-color': fingerInfo?.color || 'transparent',
                    '--finger-bg': fingerInfo?.bg || 'transparent',
                  }}
                  title={fingerInfo ? `${fingerInfo.finger}` : key}
                >
                  <span className="key-label">
                    {key === ' ' ? 'Space' : key === 'Backspace' ? '⌫' : key}
                  </span>
                  {isNext && (
                    <span className="key-pulse-ring" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger guide legend */}
      <div className="finger-legend">
        {Object.entries(FINGER_COLORS).map(([key, { finger, color }]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            <span className="legend-key">{key === ';' ? ';' : key.toUpperCase()}</span>
            <span className="legend-finger">{finger}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
