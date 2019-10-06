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
  audioTitle: 'Exercise text',
  linkForAudio: 'http://audiorazgovornik.ru/images/mp3/971-english-teaching.mp3',
  audioId: 690454843,
  recordLength: 193000,
  audioText: 'Tom:\n'
        + 'We\'re both English teachers. Is there anything you hate about teaching English?\t'
        + 'Мы оба преподаватели английского языка. Что тебе больше всего не нравится в преподавании английского языка?\n'
        + 'Jess:\n'
        + 'There\'s actually not much that I hate about teaching English but there is one thing which drives me balmy, '
        + 'and annoys me more than anything else and that\'s correcting the same mistake over, and over, and over again,'
        + ' and it seems that every country in which I\'ve worked, every nationality of English learners have one mistake'
        + ' that they always make over and over again. In Hungary, when you say how are you to a Hungarian student,'
        + ' they\'ll reply in English, I\'m feeling myself well, which is a direct translation from Hungarian but'
        + ' sounds rather strange and a little bit rude in English, and I must have corrected that mistake millions of '
        + 'times while I was there. The same students again and again and again and again, so the repetition of making the'
        + ' same correction really gets my goat. How about you? What do you hate about teaching?\n'
        + 'Tom:\n'
        + 'I really wouldn\'t say I hate something about teaching, but I definitely think there are things that waste my '
        + 'time when I\'m teaching. After every lesson, I very carefully right up a lesson plan, bring all those materials'
        + ' together, put it in a little plastic wallet and store it away in a folder, and I know full well I will never'
        + ' open that folder to read about that lesson again. I kind of approach every lesson as fresh and new and try '
        + 'and come up with something different and every time I\'m writing them all up, doing all this paperwork and I'
        + ' really don\'t need to. I need to get in control of myself and stop doing that. You told me what you most '
        + 'dislike about teaching, but I\'m sure you love this job. What are some things you like about English teaching?\n'
        + 'Jess:\n'
        + 'I think the thing I like the most about teaching is what I call the "Ah-hah" moment when you\'re studying a'
        + ' language point with a class or a student and you can almost see physically the moment they understand, '
        + 'they moment they\'re able to make sense of the language or they can do the task that you\'ve asked them to do,'
        + ' and you can almost see a light bulb go off above their head, "Ah-hah! Now I understand." and I love that. '
        + 'I love the surge of confidence that gives the students and also makes me feel really good that I helped them '
        + 'to reach that point. What do you love about teaching Tom?\n'
        + 'Tom:\n'
        + 'The thing I really love is right at the end of the course, when the students come up to you after a long time '
        + 'of haranguing about homework and about being late and about correction and drilling and the students come up '
        + 'and say, "Teacher, we\'re all going to dinner at the end of the course. Do you want to come with us?" and '
        + 'that must makes me smile. Now, I know I saying this to you Jess, but I know there\'s a lot of people out'
        + ' there listening to this. It really makes my heart warm to go and have some social time with the students '
        + 'at the end of a long course.\n'
        + 'Jess:\n'
        + 'So the thing you like most about teaching is when the teaching is finished?\t\n'
        + 'Tom:\n'
        + 'Oh, you\'ve got me on that one, yes.',
  completeSentenceQuestions: [
    {
      id: 1,
      wrong: false,
      correct: false,
      displayedTextLeftSide: 'Jess worked with every nationality of ',
      displayedTextRightSide: '',
      expectedText: 'Jess worked with every nationality of English learners',
      actualAnswer: '',
    },

    {
      id: 2,
      wrong: false,
      correct: false,
      answerStatus: false,
      displayedTextLeftSide: 'She had to correct their mistakes million times while she was in',
      displayedTextRightSide: '',
      expectedText: 'She had to correct their mistakes million times while she was in Hungary',
      actualAnswer: '',
    },

    {
      id: 3,
      wrong: false,
      correct: false,
      answerStatus: false,
      displayedTextLeftSide: 'This is a test question. You should write the test ',
      displayedTextRightSide: ' here!',
      expectedText: 'This is a test question. You should write the test answer here!',
      actualAnswer: '',
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
  completeSentenceStarted: false,
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
    payload: initialState,
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

function* finishPlayingAudioSaga() {
  yield put({
    type: UPDATE_STATE,
    payload: {
      recordingAudio: false,
    },
  });
}

function* checkIsCompleteSentenceExerciseFinishedSaga() {
  yield finishPlayingAudioSaga();
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
  const callback = answer;
  const questions = yield select(
    state => state.listeningExercise.exerciseData.completeSentenceQuestions,
  );
  const currentQuestion = questions.find(filter);
  const currentQuestionIndex = questions.findIndex(filter);

  currentQuestion.actualAnswer = answer.payload.actualAnswer;

  if (currentQuestion.expectedText === answer.payload.actualAnswer) {
    callback.payload.isAnswerCorrect = true;
    currentQuestion.wrong = false;
    currentQuestion.correct = true;
  } else {
    callback.payload.isAnswerCorrect = false;
    currentQuestion.wrong = true;
    currentQuestion.correct = false;
  }

  questions[currentQuestionIndex] = currentQuestion;
  yield updateCompleteSentenceSaga(questions);
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
  yield put({
    type: UPDATE_STATE,
    payload: {
      completeSentenceStarted: true,
    },
  });
  yield playAudioSaga();
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
