import { fork } from 'redux-saga/effects';
import { watchAppSagas } from './ducks/app.duck';

export default function* rootSaga() {
	yield fork(watchAppSagas);
}