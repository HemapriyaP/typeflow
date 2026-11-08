import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    sessions: [],
  },
  reducers: {
    saveSession(state, action) {
      state.sessions.push(action.payload);
    },
    loadHistory(state, action) {
      state.sessions = action.payload;
    },
    clearHistory(state) {
      state.sessions = [];
    },
  },
});

export const { saveSession, loadHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
