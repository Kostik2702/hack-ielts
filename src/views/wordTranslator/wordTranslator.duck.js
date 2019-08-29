import { createAction } from 'redux-actions';
import { takeEvery, put, select } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import * as R from 'ramda';
import { UPDATE_LOADER } from '../../ducks/app.duck';

const UPDATE_STATE = 'translator/UPDATE_STATE';
const GET_TRANSLATIONS = 'translator/GET_TRANSLATIONS';
const RUN_EXERCISE = 'translator/RUN_EXERCISE';
const CHECK_RESULT = 'translator/CHECK_RESULT';
const FINISH_EXERCISE = 'translator/FINISH_EXERCISE';

export const updateState = createAction(UPDATE_STATE);
export const getTranslationsData = createAction(GET_TRANSLATIONS);
export const runExercise = createAction(RUN_EXERCISE);
export const checkResult = createAction(CHECK_RESULT);
export const finishExercise = createAction(FINISH_EXERCISE);

const FINAL_ITERATION = 5;

const initialState = {
  translations: [],
  exerciseWord: '',
  translatedWords: [],
  words: [],
  iteration: 0,
  success: false,
  failure: { word: '' },
  showMessage: false,
  showExercise: true,
};

export default function wordTranslatorReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

function* isWordTranslatedSaga(word) {
  const translatedWords = yield select(state => state.translator.translatedWords);
  return translatedWords.includes(word);
}

function* getRandomWordSaga(words) {
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (yield isWordTranslatedSaga(word));
  return word;
}

function addWrongTranslations(translations, words) {
  while (translations.length < 5) {
    const { translation } = words[Math.floor(Math.random() * words.length)].translation;
    if (translation.includes(translation)) return;
    translations.push(translation);
  }
}

export function* getDataSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  const response = yield API.get('notes', '/vocabulary');
  if (response.length === 0) {
    return;
  }
  const diff = (a, b) => b.createdAt - a.createdAt;
  const wordsList = R.sort(diff, response);

  yield put({ type: UPDATE_STATE, payload: { words: wordsList } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
  yield put({ type: RUN_EXERCISE });
}

function* runExerciseSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });

  const words = yield select(state => state.translator.words);
  const word = yield getRandomWordSaga(words);
  const translationsList = [word.translation];
  while (translationsList.length < 5) {
    const wrongWord = words[Math.floor(Math.random() * words.length)];
    if (!translationsList.includes(wrongWord.translation)) {
      translationsList.push(wrongWord.translation);
    }
  }
  translationsList.sort(() => Math.random() - 0.5);

  let currentIteration = yield select(state => state.translator.iteration);
  currentIteration += 1;
  yield put({
    type: UPDATE_STATE,
    payload: {
      translations: translationsList,
      exerciseWord: word,
      iteration: currentIteration,
      showExercise: true,
      showMessage: false,
    },
  });

  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

function* checkAnswerSaga(selectedTranslation) {
  const expectedTranslation = yield select(state => state.translator.exerciseWord.translation);
  if (expectedTranslation === selectedTranslation.payload) {
    const currentTranslatedWords = yield select(state => state.translator.translatedWords);
    const iterations = yield select(state => state.translator.iteration);
    currentTranslatedWords.push = yield select(state => state.translator.exerciseWord);
    yield put({
      type: UPDATE_STATE,
      payload: {
        failure: { word: '' },
        showMessage: false,
        translatedWords: currentTranslatedWords,
      },
    });

    if (iterations < FINAL_ITERATION) {
      yield put({ type: RUN_EXERCISE });
    } else {
      yield put({ type: FINISH_EXERCISE });
    }
  } else {
    yield put({
      type: UPDATE_STATE,
      payload: {
        failure: {
          word: selectedTranslation.payload,
        },
      },
    });
  }
}

function* finishExerciseSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  yield put({
    type: UPDATE_STATE,
    payload: {
      translations: [],
      exerciseWord: '',
      iteration: 0,
      success: true,
      showMessage: true,
      showExercise: false,
    },
  });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}


export function* watchTranslatorSaga() {
  yield takeEvery(GET_TRANSLATIONS, getDataSaga);
  yield takeEvery(RUN_EXERCISE, runExerciseSaga);
  yield takeEvery(CHECK_RESULT, checkAnswerSaga);
  yield takeEvery(FINISH_EXERCISE, finishExerciseSaga);
}
