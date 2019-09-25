import { createAction } from 'redux-actions';
import {
  takeEvery, put, select, delay, call,
} from 'redux-saga/effects';

import { UPDATE_LOADER } from '../../ducks/app.duck';

export const UPDATE_STATE = 'audition/UPDATE_STATE';
export const INIT_EXERCISE = 'audition/INIT';
export const RUN_EXERCISE = 'audition/RUN';
export const CHECK_COMPLETE_SENTENCE_ANSWER = 'audition/CHECK_COMPLETE_SENTENCE_ANSWER';

export const updateState = createAction(UPDATE_STATE);
export const initExercise = createAction(INIT_EXERCISE);
export const runExercise = createAction(RUN_EXERCISE);
export const checkCompleteSentenceAnswer = createAction(CHECK_COMPLETE_SENTENCE_ANSWER);

const EMPTY_FILE = null;
const EMPTY = '';
const EXERCISE_DATA_MOCK = {
  linkForAudio: 'http://audiorazgovornik.ru/images/mp3/971-english-teaching.mp3',
  recordLength: 193000,
  completeSentenceQuestions: [
    {
      id: 1,
      wrong: false,
      correct: false,
      displayedText: 'Jess worked with every nationality of',
      expectedText: 'Jess worked with every nationality of English learners',
    },

    {
      id: 2,
      wrong: false,
      correct: false,
      answerStatus: false,
      displayedText: 'She had to correct their mistakes million times while she was in',
      expectedText: 'She had to correct their mistakes million times while she was in Hungary',
    },
  ],
};

const INITIAL_EXERCISE_DATA = {
  linkForAudio: EMPTY,
  audioFile: EMPTY_FILE,
  completeSentenceQuestions: [],
  recordLength: 0,
};

const initialState = {
  exerciseStarted: false,
  recordingAudio: false,
  isAnswersAllowed: false,
  colorAnswers: false,
  completeSentenceFinished: false,
  exerciseData: INITIAL_EXERCISE_DATA,
};

export default function listeningExerciseReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

function* getTaskDataSaga() {
  yield delay(1000);
  return EXERCISE_DATA_MOCK;
}

function* finishExerciseSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      exerciseStarted: false,
      recordingAudio: false,
      isAnswersAllowed: false,
      colorAnswers: false,
      completeSentenceFinished: false,
      exerciseData: INITIAL_EXERCISE_DATA,
    },
  });
}

function* playAudioSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      recordingAudio: true,
    },
  });

  const audioLength = yield select(state => state.listeningExercise.exerciseData.recordLength);
  yield delay(audioLength);

  yield put({
    type: UPDATE_STATE,
    payload: {
      recordingAudio: false,
    },
  });
}

function* updateCompleteSentenceSaga(questionsArray) {
  yield put({
    type: UPDATE_STATE,
    payload: {
      exerciseData: { completeSentenceQuestions: questionsArray },
    },
  });
}

function* finishCompleteSentenceExerciseSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      colorAnswers: true,
    },
  });
  yield delay(3000);
  yield put({
    type: UPDATE_STATE,
    payload: {
      completeSentenceFinished: true,
      colorAnswers: false,
    },
  });
  // start next exercise part here
}

function* checkIsCompleteSentenceExerciseFinishedSaga() {
  const questions = yield select(
    state => state.listeningExercise.exerciseData.completeSentenceQuestions,
  );
  const filter = element => element.correct === true;
  const correctAnswersCount = questions.filter(filter).length;
  const questionsCount = questions.length;
  if (correctAnswersCount === questionsCount) {
    yield finishCompleteSentenceExerciseSaga();
  }
}

function* checkCompleteSentenceAnswerSaga(answer) {
  const filter = element => element.id === answer.payload.actualId;
  const questions = yield select(
    state => state.listeningExercise.exerciseData.completeSentenceQuestions,
  );
  const currentQuestion = questions.find(filter);
  const currentQuestionIndex = questions.findIndex(filter);
  let isAnswerCorrect = false;

  if (answer.payload.actualAnswer === currentQuestion.expectedText) {
    currentQuestion.wrong = false;
    currentQuestion.correct = true;
    isAnswerCorrect = true;
  } else {
    currentQuestion.wrong = true;
    currentQuestion.correct = false;
    isAnswerCorrect = false;
  }

  questions[currentQuestionIndex] = currentQuestion;
  yield updateCompleteSentenceSaga(questions);
  const actualAnswer = answer;
  actualAnswer.payload.isAnswerCorrect = isAnswerCorrect;
  yield checkIsCompleteSentenceExerciseFinishedSaga();
}

function* finishIfInProcessSaga() {
  const exerciseStarted = yield select(state => state.listeningExercise.exerciseStarted);
  if (exerciseStarted) {
    yield finishExerciseSaga();
  }
}

function* allowAnswersSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      isAnswersAllowed: true,
    },
  });
}

function* startCompleteSentenceExerciseSaga() {
  yield playAudioSaga();
  yield allowAnswersSaga();
}

function* startExerciseSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      exerciseStarted: true,
    },
  });
  yield startCompleteSentenceExerciseSaga();
}

function* enterenceToExerciseSaga() {
  yield put({ type: UPDATE_LOADER, payload: { loading: true } });
  yield finishIfInProcessSaga();
  const taskData = yield getTaskDataSaga();
  yield put({
    type: UPDATE_STATE,
    payload: {
      exerciseData: taskData,
    },
  });
  yield put({ type: UPDATE_LOADER, payload: { loading: false } });
}

export function* watchListeningExerciseSaga() {
  yield takeEvery(INIT_EXERCISE, enterenceToExerciseSaga);
  yield takeEvery(RUN_EXERCISE, startExerciseSaga);
  yield takeEvery(CHECK_COMPLETE_SENTENCE_ANSWER, checkCompleteSentenceAnswerSaga);
}
