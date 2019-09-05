import { createAction } from 'redux-actions';
import {
  takeEvery, put, select, delay,
} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import * as R from 'ramda';
import { UPDATE_LOADER } from '../../ducks/app.duck';

const UPDATE_STATE = 'writing/UPDATE_STATE';
const GET_TRANSLATIONS = 'writing/GET_TRANSLATIONS';
const RUN_EXERCISE_ENG_RUS = 'writing/RUN_EXERCISE_ENG_RUS';
const RUN_EXERCISE_RUN_ENG = 'writing/RUN_EXERCISE_RUS_ENG';
const CHECK_ANSWER = 'writing/CHECK_ANSWER';

const EMPTY = [];
const EMPTY_WORD = { word: '' };
const ENGLISH_TO_RUSSIAN = true;
const RUSSIAN_TO_ENGLISH = false;
const NO_ITERATIONS = 0;

const API_NAME = 'notes';
const API_PATH = '/vocabulary';

const CORRECT_ANSWER_DELAY = 1000;
const FINAL_ITERATION = 5;

export const getData = createAction(GET_TRANSLATIONS);
export const updateState = createAction(UPDATE_STATE);
export const runEnglishToRussianTranslation = createAction(RUN_EXERCISE_ENG_RUS);
export const runRussianToEnglishTranslation = createAction(RUN_EXERCISE_RUN_ENG);
export const checkAnswer = createAction(CHECK_ANSWER);

const initialState = {
  words: EMPTY,
  exerciseWord: EMPTY_WORD,
  translationWay: ENGLISH_TO_RUSSIAN,
  translatedWords: EMPTY,
  iteration: NO_ITERATIONS,
  success: false,
  rightAnswer: false,
  wrongAnswer: false,
  reset: false,
};

export default function writingWordTranslatorReducer(
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
  const translatedWords = yield select(state => state.writingTranslator.translatedWords);
  return translatedWords.includes(word);
}

function* getRandomWordSaga() {
  const words = yield select(state => state.writingTranslator.words);
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (yield isWordTranslatedSaga(word));
  return word;
}

function* switchToEnglishRussianWaySaga() {
  const translationWay = yield select(state => state.writingTranslator.translationWay);
  if (translationWay !== ENGLISH_TO_RUSSIAN) {
    yield put({
      type: UPDATE_STATE,
      payload: {
        translationWay: ENGLISH_TO_RUSSIAN,
      },
    });
  }
}

function* switchToRussianEnglishWaySaga() {
  const translationWay = yield select(state => state.writingTranslator.translationWay);
  if (translationWay !== RUSSIAN_TO_ENGLISH) {
    yield put({
      type: UPDATE_STATE,
      payload: {
        translationWay: RUSSIAN_TO_ENGLISH,
      },
    });
  }
}

function* getExpectedTranslationSaga() {
  const wayOfTranslation = yield select(state => state.writingTranslator.translationWay);
  if (wayOfTranslation === ENGLISH_TO_RUSSIAN) {
    return yield select(state => state.writingTranslator.exerciseWord.translation);
  }
  return yield select(state => state.writingTranslator.exerciseWord.word);
}

function* highlightRightAnswerSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      rightAnswer: true,
    },
  });

  yield delay(CORRECT_ANSWER_DELAY);
}

function* finishExerciseSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      success: true,
      exerciseWord: EMPTY_WORD,
      iteration: NO_ITERATIONS,
      translatedWords: EMPTY,
      rightAnswer: false,
    },
  });
}

function* runExerciseIterationSaga() {
  const word = yield getRandomWordSaga();
  let currentIteration = yield select(state => state.writingTranslator.iteration);
  currentIteration += 1;
  yield put({
    type: UPDATE_STATE,
    payload: {
      exerciseWord: word,
      iteration: currentIteration,
      rightAnswer: false,
      reset: false,
    },
  });
}

function* checkIsFinalIterationSaga() {
  const currentIteration = yield select(state => state.writingTranslator.iteration);
  if (currentIteration < FINAL_ITERATION) {
    yield runExerciseIterationSaga();
  } else {
    yield finishExerciseSaga();
  }
}

function* resetFormDataSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      reset: true,
    },
  });
}

function* processCorrectAnswerSaga() {
  const translatedWord = yield select(state => state.writingTranslator.exerciseWord);
  const translatedWords = yield select(state => state.writingTranslator.translatedWords);
  translatedWords.push(translatedWord);
  yield put({
    type: UPDATE_STATE,
    payload: {
      wrongAnswer: false,
    },
  });
  yield highlightRightAnswerSaga();
  yield resetFormDataSaga();
  yield checkIsFinalIterationSaga();
}

function* processWrongAnswerSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      wrongAnswer: true,
    },
  });
}

function* checkAnswerSaga(event) {
  const actualAnswer = event.payload;
  const expectedTranslation = yield getExpectedTranslationSaga();
  if (actualAnswer === expectedTranslation) {
    yield processCorrectAnswerSaga();
  } else {
    yield processWrongAnswerSaga();
  }
}

function* startEnglishToRussianTranslationExercise() {
  yield switchToEnglishRussianWaySaga();
  yield put({
    type: UPDATE_STATE,
    payload: {
      success: false,
    },
  });
  yield runExerciseIterationSaga();
}

function* startRussianToEnglishTranslationExercise() {
  yield switchToRussianEnglishWaySaga();
  yield put({
    type: UPDATE_STATE,
    payload: {
      success: false,
    },
  });
  yield runExerciseIterationSaga();
}

function* getDataSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  const response = yield API.get(API_NAME, API_PATH);
  if (response.length === 0) {
    return;
  }
  const diff = (a, b) => b.createdAt - a.createdAt;
  const wordsList = R.sort(diff, response);
  yield put({ type: UPDATE_STATE, payload: { words: wordsList } });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* watchWritingTranslatorSaga() {
  yield takeEvery(GET_TRANSLATIONS, getDataSaga);
  yield takeEvery(RUN_EXERCISE_ENG_RUS, startEnglishToRussianTranslationExercise);
  yield takeEvery(RUN_EXERCISE_RUN_ENG, startRussianToEnglishTranslationExercise);
  yield takeEvery(CHECK_ANSWER, checkAnswerSaga);
}
