import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    difficulty: 'beginner',
    soundEnabled: false,
    showFingerGuide: true,
  },
  reducers: {
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    toggleSound(state) {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleFingerGuide(state) {
      state.showFingerGuide = !state.showFingerGuide;
    },
  },
});

export const { setDifficulty, toggleSound, toggleFingerGuide } = settingsSlice.actions;
export default settingsSlice.reducer;
