import { createAction } from 'redux-actions';
import {
  takeEvery, put, select, delay,
} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import * as R from 'ramda';
import { UPDATE_LOADER } from '../../ducks/app.duck';

const UPDATE_STATE = 'translator/UPDATE_STATE';
const GET_TRANSLATIONS = 'translator/GET_TRANSLATIONS';
const RUN_EXERCISE = 'translator/RUN_EXERCISE';
const CHECK_RESULT = 'translator/CHECK_RESULT';
const FINISH_EXERCISE = 'translator/FINISH_EXERCISE';
const SWITCH_TO_RUSSIAN = 'translator/SWITCH_TO_RUSSIAN';
const SWITCH_TO_ENGLISH = 'translator/SWITCH_TO_RUSSIAN';

export const updateState = createAction(UPDATE_STATE);
export const getTranslationsData = createAction(GET_TRANSLATIONS);
export const runExercise = createAction(RUN_EXERCISE);
export const checkResult = createAction(CHECK_RESULT);
export const finishExercise = createAction(FINISH_EXERCISE);

const FINAL_ITERATION = 5;
const TRANSLATIONS_COUNT = 5;
const EMPTY_WORD = { word: '' };
const NO_ITERATIONS = 0;
const EMPTY = [];

const API_NAME = 'notes';
const API_PATH = '/vocabulary';

const CORRECT_ANSWER_DELAY = 1000;
const ENGLISH_TO_RUSSIAN = true;
const RUSSIAN_TO_ENGLISH = false;

const initialState = {
  translations: EMPTY,
  exerciseWord: EMPTY_WORD,
  translatedWords: EMPTY,
  words: EMPTY,
  iteration: NO_ITERATIONS,
  success: false,
  failure: EMPTY_WORD,
  showMessage: false,
  showExercise: true,
  showAnswers: false,
  translationWay: RUSSIAN_TO_ENGLISH,
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

function addWrongTranslations(words, translationsList, translationWay) {
  while (translationsList.length < TRANSLATIONS_COUNT) {
    const wrongWord = words[Math.floor(Math.random() * words.length)];
    if (translationWay === RUSSIAN_TO_ENGLISH
        && !translationsList.includes(wrongWord.translation)) {
      translationsList.push(wrongWord.translation);
    } else if (translationWay === ENGLISH_TO_RUSSIAN
        && !translationsList.includes(wrongWord.word)) {
      translationsList.push(wrongWord.word);
    }
  }
  return translationsList;
}

function getExpectedTranslation(exerciseWord, translationWay) {
  if (translationWay === RUSSIAN_TO_ENGLISH) {
    return exerciseWord.translation;
  }
  return exerciseWord.word;
}


function* prepareTranslationsSaga(words, word) {
  const translationWay = yield select(state => state.translator.translationWay);
  let translationsList = [];
  translationsList.push(getExpectedTranslation(word, translationWay));
  translationsList = addWrongTranslations(words, translationsList, translationWay);
  translationsList.sort(() => Math.random() - 0.5);
  return translationsList;
}

function* switchTranslationToEnglishSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      translationWay: RUSSIAN_TO_ENGLISH,
    },
  });
}

function* switchTranslationToRussianSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      translationWay: ENGLISH_TO_RUSSIAN,
    },
  });
}

function* displayAnswersSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      showAnswers: true,
    },
  });
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

function* isFinalIterationSaga(iteration) {
  if (iteration < FINAL_ITERATION) {
    yield put({ type: RUN_EXERCISE });
  } else {
    yield put({ type: FINISH_EXERCISE });
  }
}

function* runExerciseIterationSaga(translationsList, word, iteration) {
  const currentIteration = iteration + 1;
  yield put({
    type: UPDATE_STATE,
    payload: {
      translations: translationsList,
      exerciseWord: word,
      iteration: currentIteration,
      showExercise: true,
      showMessage: false,
      showAnswers: false,
    },
  });
}

function* processCorrectAnswerSaga() {
  const currentTranslatedWords = yield select(state => state.translator.translatedWords);
  const iterations = yield select(state => state.translator.iteration);
  currentTranslatedWords.push = yield select(state => state.translator.exerciseWord);

  yield put({
    type: UPDATE_STATE,
    payload: {
      failure: EMPTY_WORD,
      showMessage: false,
      translatedWords: currentTranslatedWords,
    },
  });

  yield displayAnswersSaga();
  yield delay(CORRECT_ANSWER_DELAY);
  yield isFinalIterationSaga(iterations);
}

function* processWrongAnswerSaga(actualTranslation) {
  yield put({
    type: UPDATE_STATE,
    payload: {
      failure: {
        word: actualTranslation,
      },
    },
  });
}

function* finishExerciseSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      translations: EMPTY,
      translatedWords: EMPTY,
      exerciseWord: EMPTY_WORD,
      iteration: NO_ITERATIONS,
      success: true,
      showMessage: true,
      showExercise: false,
    },
  });
}

function* finishIfExerciseInProgressSaga() {
  const exerciseWord = yield select(state => state.translator.exerciseWord);
  if (exerciseWord !== EMPTY_WORD) {
    yield finishExerciseSaga();
  }
}

function* setActualTranslationWay(unit, translationWay) {
  if (unit === 'english') {
    if (translationWay !== RUSSIAN_TO_ENGLISH) {
      yield switchTranslationToEnglishSaga();
    }
  }
  if (unit === 'russian') {
    if (translationWay !== ENGLISH_TO_RUSSIAN) {
      yield switchTranslationToRussianSaga();
    }
  }
}

function* runExerciseSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });

  const words = yield select(state => state.translator.words);
  const word = yield getRandomWordSaga(words);
  const translationsList = yield prepareTranslationsSaga(words, word);
  const currentIteration = yield select(state => state.translator.iteration);
  yield runExerciseIterationSaga(translationsList, word, currentIteration);

  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* getDataSaga(unit) {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  const response = yield API.get(API_NAME, API_PATH);
  if (response.length === 0) {
    return;
  }
  const diff = (a, b) => b.createdAt - a.createdAt;
  const wordsList = R.sort(diff, response);

  const translationWay = yield select(state => state.translator.translationWay);
  yield setActualTranslationWay(unit.payload, translationWay);

  yield put({ type: UPDATE_STATE, payload: { words: wordsList } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
  yield finishIfExerciseInProgressSaga();
  yield runExerciseSaga();
}


function* checkAnswerSaga(event) {
  const actualTranslation = event.payload;
  const translationWay = yield select(state => state.translator.translationWay);
  const expectedTranslation = getExpectedTranslation(
    yield select(state => state.translator.exerciseWord), translationWay,
  );

  if (expectedTranslation === actualTranslation) {
    yield processCorrectAnswerSaga();
  } else {
    yield processWrongAnswerSaga(actualTranslation);
  }
}

export function* watchTranslatorSaga() {
  yield takeEvery(GET_TRANSLATIONS, getDataSaga);
  yield takeEvery(RUN_EXERCISE, runExerciseSaga);
  yield takeEvery(CHECK_RESULT, checkAnswerSaga);
  yield takeEvery(FINISH_EXERCISE, finishExerciseSaga);
}
