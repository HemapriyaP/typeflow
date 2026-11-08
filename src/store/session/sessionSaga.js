import { take, put, call, race, delay, select, takeLatest } from 'redux-saga/effects';
import {
  startSession,
  pauseSession,
  resumeSession,
  finishSession,
  tickTimer,
} from './sessionSlice';
import { saveSession } from '../history/historySlice';

function* timerSaga() {
  while (true) {
    const { paused, finished } = yield race({
      tick: delay(1000),
      paused: take(pauseSession.type),
      finished: take(finishSession.type),
    });

    if (paused) {
      // Wait for resume
      yield take(resumeSession.type);
      continue;
    }

    if (finished) break;

    yield put(tickTimer());

    const timeRemaining = yield select((state) => state.session.timeRemaining);
    if (timeRemaining <= 0) break;
  }
}

function* watchSessionEnd() {
  yield take(finishSession.type);
  const session = yield select((state) => state.session);
  const result = {
    id: Date.now(),
    date: new Date().toISOString(),
    stats: { ...session.stats },
    keystrokes: session.keystrokes,
  };
  yield put(saveSession(result));
  // Persist to localStorage
  yield call(persistSession, result);
}

function persistSession(session) {
  try {
    const existing = JSON.parse(localStorage.getItem('typeflow_history') || '[]');
    existing.push(session);
    localStorage.setItem('typeflow_history', JSON.stringify(existing.slice(-20))); // Keep last 20
  } catch (e) {
    console.error('Failed to persist session', e);
  }
}

export function* sessionSaga() {
  while (true) {
    yield take(startSession.type);
    yield race({
      timer: call(timerSaga),
      sessionEnd: call(watchSessionEnd),
    });
  }
}
