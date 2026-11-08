import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  startSession,
  pauseSession,
  resumeSession,
  finishSession,
  resetSession,
} from '../../store/session/sessionSlice';
import HUD from '../../components/HUD/HUD';
import TypingBox from '../../components/TypingBox/TypingBox';
import Keyboard from '../../components/Keyboard/Keyboard';
import LessonSelector from '../../components/LessonSelector/LessonSelector';
import './Practice.css';

export default function Practice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((s) => s.session);
  const difficulty = useSelector((s) => s.settings.difficulty);

  const [nextKey, setNextKey] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // Clear lastResult after a short time
  useEffect(() => {
    if (lastResult) {
      const t = setTimeout(() => setLastResult(null), 400);
      return () => clearTimeout(t);
    }
  }, [lastResult]);

  // Navigate to results when session finishes
  useEffect(() => {
    if (status === 'finished') {
      setTimeout(() => navigate('/results'), 1200);
    }
  }, [status, navigate]);

  const handleStart = () => dispatch(startSession({ difficulty }));
  const handlePause = () => dispatch(pauseSession());
  const handleResume = () => dispatch(resumeSession());
  const handleStop = () => {
    dispatch(finishSession());
  };
  const handleReset = () => dispatch(resetSession());

  const handleNextKey = useCallback((key) => setNextKey(key), []);
  const handleLastResult = useCallback((result) => setLastResult(result), []);

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';
  const isIdle = status === 'idle';

  return (
    <div className="practice">
      <div className="practice-content">
        {/* Page header */}
        <div className="practice-header">
          <div className="practice-header-left">
            <h1 className="practice-title">Practice Session</h1>
            <p className="practice-subtitle">Home row keys · A S D F J K L ;</p>
          </div>
          <div className="practice-controls">
            {isIdle && (
              <button id="btn-start" className="ctrl-btn ctrl-primary" onClick={handleStart}>
                ▶ Start
              </button>
            )}
            {isRunning && (
              <>
                <button id="btn-pause" className="ctrl-btn ctrl-secondary" onClick={handlePause}>
                  ⏸ Pause
                </button>
                <button id="btn-stop" className="ctrl-btn ctrl-danger" onClick={handleStop}>
                  ⏹ Finish
                </button>
              </>
            )}
            {isPaused && (
              <>
                <button id="btn-resume" className="ctrl-btn ctrl-primary" onClick={handleResume}>
                  ▶ Resume
                </button>
                <button id="btn-stop-paused" className="ctrl-btn ctrl-danger" onClick={handleStop}>
                  ⏹ Finish
                </button>
              </>
            )}
            {(isFinished || isIdle) && status !== 'idle' && (
              <button id="btn-reset" className="ctrl-btn ctrl-secondary" onClick={handleReset}>
                ↺ Reset
              </button>
            )}
          </div>
        </div>

        {/* Status badge */}
        {isPaused && (
          <div className="status-banner status-paused">⏸ Session Paused — press Resume to continue</div>
        )}
        {isFinished && (
          <div className="status-banner status-finished">✅ Session Complete! Redirecting to results…</div>
        )}

        {/* HUD stats */}
        <HUD />

        {/* Difficulty selector */}
        <LessonSelector disabled={!isIdle} />

        {/* Typing Box */}
        <TypingBox onNextKey={handleNextKey} onLastResult={handleLastResult} />

        {/* Virtual Keyboard */}
        <Keyboard nextKey={nextKey} lastResult={lastResult} />

        {/* Instructions panel */}
        {isIdle && (
          <div className="instructions">
            <h3>How to use</h3>
            <ul>
              <li>🖱️ Select a difficulty level above</li>
              <li>▶️ Press <strong>Start</strong> to begin your 5-minute session</li>
              <li>⌨️ Type the highlighted characters using only the 8 home-row keys</li>
              <li>👀 The keyboard below shows which key to press next (highlighted)</li>
              <li>📊 Your accuracy and speed are measured in real time</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
