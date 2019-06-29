import { createAction } from 'redux-actions';
import { takeEvery, put, select } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import * as R from 'ramda';
import { UPDATE_LOADER } from '../../ducks/app.duck';

export const UPDATE_STATE = 'vocabulary/UPDATE_STATE';
export const FETCH_VOCABULARY = 'vocabulary/FETCH_VOCABULARY';
export const ADD_NEW_WORD = 'vocabulary/ADD_NEW_WORD';

export const updateState = createAction(UPDATE_STATE);
export const fetchVocabulary = createAction(FETCH_VOCABULARY);
export const addNewWord = createAction(ADD_NEW_WORD);

const initialState = {
  words: [],
};

export default function vocabularyReducer(state = initialState, { type, payload }) {
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
  //
  // AWS.config.update({ region: 'us-east-1' });
  // AWS.config.credentials = new AWS.Credentials('AKIAJHKIKOQBZ5QDR4JQ',
  // '1Ym3B6nItixwvoy1u5NDtdOTqzHOwXw+rCpdJjMW');
  //
  // const translateParams = {
  //   SourceLanguageCode: 'en',
  //   TargetLanguageCode: 'ru',
  //   Text: words[0].word,
  // };
  //
  // const translate = new AWS.Translate();
  // translate.translateText(translateParams, (err, data) => {
  //   if (err) {
  //     console.log('err', err);
  //   } else {
  //     console.log('data', data);
  //   }
  // });

  yield put({ type: UPDATE_STATE, payload: { words } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* addNewWordSaga() {
  const payload = yield select(state => state.form.newWord.values);
  try {
    const response = yield API.put('notes', '/vocabulary', { body: payload });
    const words = yield select(state => state.vocabulary.words);
    const updatedWords = R.insert(0, response, words);
    yield put({ type: UPDATE_STATE, payload: { words: updatedWords } });
  } catch (e) {
    console.log(e.response.data);
  }
}

export function* watchVocabularySagas() {
  yield takeEvery(FETCH_VOCABULARY, fetchVocabularySaga);
  yield takeEvery(ADD_NEW_WORD, addNewWordSaga);
}
