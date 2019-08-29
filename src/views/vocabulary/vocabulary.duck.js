import { createAction } from 'redux-actions';
import { takeEvery, put, select } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { reset } from 'redux-form';

import * as R from 'ramda';
import { UPDATE_LOADER } from '../../ducks/app.duck';

export const UPDATE_STATE = 'vocabulary/UPDATE_STATE';
export const FETCH_VOCABULARY = 'vocabulary/FETCH_VOCABULARY';
export const OPEN_ADD_NEW_WORD_MODAL = 'vocabulary/OPEN_ADD_NEW_WORD_MODAL';
export const ADD_NEW_WORD = 'vocabulary/ADD_NEW_WORD';
export const DELETE_WORD = 'vocabulary/DELETE_WORD';
export const PLAY_AUDIO = 'vocabulary/PLAY_AUDIO';

export const updateState = createAction(UPDATE_STATE);
export const fetchVocabulary = createAction(FETCH_VOCABULARY);
export const addNewWord = createAction(ADD_NEW_WORD);
export const deleteWord = createAction(DELETE_WORD);
export const openNewWordModal = createAction(OPEN_ADD_NEW_WORD_MODAL);
export const playAudio = createAction(PLAY_AUDIO);

const initialState = {
  words: [],
  isModalOpen: false,
  translation: '',
  customTranslate: '',
  loadingAudio: null,
};

export default function vocabularyReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function* fetchVocabularySaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  const response = yield API.get('notes', '/vocabulary');
  if (response.length === 0) {
    return;
  }

  const diff = (a, b) => b.createdAt - a.createdAt;
  const words = R.sort(diff, response);

  yield put({ type: UPDATE_STATE, payload: { words } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* openNewWordModalSaga() {
  const payload = yield select(state => state.form.newWord.values);
  if (!payload) {
    return;
  }

  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  yield put({ type: UPDATE_STATE, payload: { isModalOpen: true } });

  const response = yield API.get('notes',
    `/vocabulary/translate/${payload.word}`);
  const translation = response.TranslatedText;
  yield put({ type: UPDATE_STATE, payload: { translation } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* addNewWordSaga({ payload: { translation, isCustom } }) {
  yield put({ type: UPDATE_STATE, payload: { isModalOpen: false } });
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });

  const formData = yield select(state => state.form.newWord.values);
  const userConfig = yield select(state => state.app.userConfig);
  const { countryCode: lang } = userConfig;
  const { word } = formData;
  try {
    const response = yield API.put('notes', '/vocabulary',
      {
        body: {
          word, translation, isCustom, lang,
        },
      });
    const words = yield select(state => state.vocabulary.words);
    const updatedWords = R.insert(0, response, words);
    yield put({ type: UPDATE_STATE, payload: { words: updatedWords } });
  } catch (e) {
    console.log(e.response.data);
  }

  yield put(reset('newWord'));

  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* deleteWordSaga({ payload: id }) {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });

  try {
    yield API.del('notes', `/vocabulary/${id}`, {});
    const words = yield select(state => state.vocabulary.words);
    const isDeleted = i => i.id !== id;
    const updatedWords = R.filter(isDeleted, words);
    yield put({ type: UPDATE_STATE, payload: { words: updatedWords } });
  } catch (e) {
    console.log(e.response.data);
  }

  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

function* playAudioSaga({ payload: word }) {
  yield put({ type: UPDATE_STATE, payload: { loadingAudio: word } });

  try {
    const audioUrl = yield API.get('notes', `/vocabulary/audio/${word}`);
    console.log('res ', audioUrl);
    document.getElementById('audioSource').src = audioUrl;
    document.getElementById('audioPlayback').load();
  } catch (e) {
    console.log(e.response.data);
  }

  yield put({ type: UPDATE_STATE, payload: { loadingAudio: null } });
}

export function* watchVocabularySagas() {
  yield takeEvery(FETCH_VOCABULARY, fetchVocabularySaga);
  yield takeEvery(OPEN_ADD_NEW_WORD_MODAL, openNewWordModalSaga);
  yield takeEvery(ADD_NEW_WORD, addNewWordSaga);
  yield takeEvery(DELETE_WORD, deleteWordSaga);
  yield takeEvery(PLAY_AUDIO, playAudioSaga);
}
