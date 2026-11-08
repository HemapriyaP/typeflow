import { put, call, takeLatest } from 'redux-saga/effects';
import { loadHistory } from './historySlice';

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('typeflow_history') || '[]');
  } catch {
    return [];
  }
}

function* handleLoadHistory() {
  const data = yield call(loadFromStorage);
  yield put(loadHistory(data));
}

export function* historySaga() {
  yield call(handleLoadHistory);
}
