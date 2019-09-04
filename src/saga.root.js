import { fork } from 'redux-saga/effects';
import { watchAuthSagas } from './ducks/auth.duck';
import { watchAppSagas } from './ducks/app.duck';
import { watchTasksSagas } from './views/tasks/tasks.duck';
import { watchVocabularySagas } from './views/vocabulary/vocabulary.duck';
import { watchMasterSagas } from './views/masterVocabulary/master.duck';
import { watchTranslatorSaga } from './views/wordTranslator/wordTranslator.duck';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
  yield fork(watchTasksSagas);
  yield fork(watchVocabularySagas);
  yield fork(watchAppSagas);
  yield fork(watchMasterSagas);
  yield fork(watchTranslatorSaga);
}
