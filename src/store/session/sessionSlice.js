import { createSlice } from '@reduxjs/toolkit';
import { generateInfiniteChunk } from '../../utils/sequenceGenerator';
import { calculateAccuracy, calculateWPM } from '../../utils/metrics';

const SESSION_DURATION = 300; // 5 minutes in seconds

const initialState = {
  status: 'idle', // idle | running | paused | finished
  timeRemaining: SESSION_DURATION,
  sequence: '',
  currentIndex: 0,
  keystrokes: [],
  stats: {
    total: 0,
    correct: 0,
    accuracy: 100,
    wpm: 0,
    elapsedSeconds: 0,
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession(state, action) {
      const difficulty = action.payload?.difficulty || 'beginner';
      state.status = 'running';
      state.timeRemaining = SESSION_DURATION;
      state.sequence = generateInfiniteChunk(difficulty);
      state.currentIndex = 0;
      state.keystrokes = [];
      state.stats = { total: 0, correct: 0, accuracy: 100, wpm: 0, elapsedSeconds: 0 };
    },
    pauseSession(state) {
      if (state.status === 'running') state.status = 'paused';
    },
    resumeSession(state) {
      if (state.status === 'paused') state.status = 'running';
    },
    finishSession(state) {
      state.status = 'finished';
    },
    tickTimer(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
        state.stats.elapsedSeconds = SESSION_DURATION - state.timeRemaining;
      }
      if (state.timeRemaining <= 0) {
        state.status = 'finished';
      }
    },
    recordKeystroke(state, action) {
      const { char, expected, correct } = action.payload;
      state.keystrokes.push({ char, expected, correct, timestamp: Date.now() });

      if (expected !== ' ') {
        state.stats.total += 1;
        if (correct) state.stats.correct += 1;
      }

      if (correct) {
        state.currentIndex += 1;
        // Extend sequence if running low
        if (state.currentIndex >= state.sequence.length - 50) {
          state.sequence += ' ' + generateInfiniteChunk(action.payload.difficulty || 'beginner');
        }
      }

      state.stats.accuracy = calculateAccuracy(state.stats.correct, state.stats.total);
      state.stats.wpm = calculateWPM(state.stats.correct, state.stats.elapsedSeconds);
    },
    resetSession() {
      return { ...initialState };
    },
  },
});

export const {
  startSession,
  pauseSession,
  resumeSession,
  finishSession,
  tickTimer,
  recordKeystroke,
  resetSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
