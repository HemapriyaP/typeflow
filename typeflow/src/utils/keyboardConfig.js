// Keyboard layout config — finger assignments + colors for home-row keys
export const FINGER_COLORS = {
  a: { finger: 'Left Pinky',  color: '#ff6b9d', bg: 'rgba(255,107,157,0.15)' },
  s: { finger: 'Left Ring',   color: '#c77dff', bg: 'rgba(199,125,255,0.15)' },
  d: { finger: 'Left Middle', color: '#5b8dee', bg: 'rgba(91,141,238,0.15)' },
  f: { finger: 'Left Index',  color: '#00d4ff', bg: 'rgba(0,212,255,0.15)' },
  j: { finger: 'Right Index', color: '#00f5a0', bg: 'rgba(0,245,160,0.15)' },
  k: { finger: 'Right Middle',color: '#ffd60a', bg: 'rgba(255,214,10,0.15)' },
  l: { finger: 'Right Ring',  color: '#ff9500', bg: 'rgba(255,149,0,0.15)' },
  ';': { finger: 'Right Pinky', color: '#ff4757', bg: 'rgba(255,71,87,0.15)' },
};

// Full keyboard rows for rendering
export const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl'],
];
