import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sessionReducer from './session/sessionSlice';
import historyReducer from './history/historySlice';
import settingsReducer from './settings/settingsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    session: sessionReducer,
    history: historyReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
