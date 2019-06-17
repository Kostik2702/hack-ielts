import { fork } from 'redux-saga/effects';
import { watchAuthSagas } from './ducks/auth.duck';
import { watchTasksSagas } from './views/tasks/tasks.duck';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
  yield fork(watchTasksSagas);
}
