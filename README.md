# TypeFlow — Touch Typing Trainer

A premium, production-ready web application for learning touch typing, built with **React 18, Redux Toolkit, Redux-Saga, and CSS3**.

## 🎯 Focus Keys
Practice the 8 essential home-row keys:  
**A · S · D · F · J · K · L · ;**

## 🚀 Features

### Must-Haves ✅
- **Typing Box** — scrolling character sequences to type, showing correct (green) and pending characters with a live blinking cursor
- **Visual Keyboard** — full QWERTY keyboard rendered in CSS, with each of the 8 home-row keys color-coded by finger assignment, and the **next key pulsing/highlighted** in real-time
- **5-Minute Session Timer** — countdown HUD with progress bar; session ends automatically at 0:00
- **Keystroke Counter** — total keypresses tracked in the HUD
- **Accuracy %** — real-time accuracy calculation with color-coded indicator (green/yellow/red)

### Nice-to-Haves ✅
- **CSS3 Design & Animations** — glassmorphism panels, animated particles background, key bounce/pulse animations, error shake effect, gradient typography
- **Redux (RTK)** — full state management for session, history, and settings
- **Redux-Saga** — middleware for async side-effects: 1-second timer ticks, localStorage persistence, history loading on startup
- **3 Difficulty Levels** — Beginner / Intermediate / Advanced (adjustable before each session)
- **WPM calculation** — live words-per-minute using the standard 5-chars-per-word formula
- **Results Screen** — per-key accuracy bar chart (Recharts), session history line chart, full session summary
- **History Persistence** — sessions saved to `localStorage`, loaded on next visit
- **Responsive Design** — works on desktop and tablet

## 🏗️ Architecture

```
React 18 + Vite
├── Redux Toolkit (RTK)       — State management
│   ├── sessionSlice          — Timer, keystrokes, stats
│   ├── historySlice          — Past sessions
│   └── settingsSlice         — Difficulty, toggles
├── Redux-Saga                — Async middleware
│   ├── sessionSaga           — Timer tick, session end handler
│   └── historySaga           — localStorage load on boot
├── React Router v6           — 3-page routing
└── Recharts                  — Results charts
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Keyboard/       # Visual keyboard with finger coloring + next-key pulse
│   ├── TypingBox/      # Character display + keystroke capture
│   ├── HUD/            # Live stats panel
│   ├── LessonSelector/ # Difficulty picker
│   └── Navbar/         # Navigation with live stats overlay
├── pages/
│   ├── Home/           # Landing page with key guide
│   ├── Practice/       # Main practice screen
│   └── Results/        # Analytics & history
├── store/
│   ├── session/        # Slice + Saga
│   ├── history/        # Slice + Saga
│   ├── settings/       # Slice
│   └── rootSaga.js
└── utils/
    ├── sequenceGenerator.js  # Random key sequences by difficulty
    ├── metrics.js            # WPM/accuracy formulas
    └── keyboardConfig.js     # Finger assignments + colors
```

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

App runs at: http://localhost:5173/

## 📦 Build for Production

```bash
npm run build
```

## 🧪 How to Use

1. Open the app and go to **Practice**
2. Select a difficulty level (Beginner recommended for starters)
3. Click **Start** — the 5-minute timer begins
4. Type the characters shown in the box using **only the 8 home-row keys**
5. Watch the **keyboard** to see which key to press next (highlighted)
6. When the timer ends, you'll be redirected to **Results**
7. View your accuracy breakdown per key and WPM

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a0e1a` (deep navy) |
| Accent | `#00d4ff` (electric cyan) |
| Accent 2 | `#c77dff` (soft purple) |
| Font | Inter + JetBrains Mono (Google Fonts) |
| Style | Glassmorphism + dark mode |
