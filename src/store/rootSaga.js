import { all, fork } from 'redux-saga/effects';
import { sessionSaga } from './session/sessionSaga';
import { historySaga } from './history/historySaga';

export default function* rootSaga() {
  yield all([
    fork(sessionSaga),
    fork(historySaga),
  ]);
}
