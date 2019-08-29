import { createAction } from 'redux-actions';
import { takeEvery, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { API } from 'aws-amplify';

export const UPDATE_STATE = 'master/UPDATE_STATE';
export const ADD_LETTER = 'master/ADD_LETTER';
export const FETCH_CONSTRUCTOR_SET = 'master/FETCH_CONSTRUCTOR_SET';

export const updateState = createAction(UPDATE_STATE);
export const addLetter = createAction(ADD_LETTER);
export const fetchConstructorSet = createAction(FETCH_CONSTRUCTOR_SET);

export const units = {
  constructor: 'constructor',
  'word-translation': 'translation',
  listening: 'listening',
};

const initialState = {
  word: '',
  words: [],
  translation: '',
  answer: [],
  mistakes: { amount: 0, wIdx: -1 },
  unitProgress: { step: 0, wordsSet: [], isFinished: false },
};

const shuffle = (a) => {
  const arr = a;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function masterReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

function* fetchConstructorSetSaga() {
  const wordsSet = yield API.get('notes', '/master/constructor');
  const firstWord = wordsSet[0];
  const { translation, word } = firstWord;
  const words = shuffle(word.split(''));
  const answer = words.map(() => '');
  yield put({
    type: UPDATE_STATE,
    payload: {
      word,
      words,
      answer,
      translation,
      unitProgress: { wordsSet, step: 0, isFinished: false },
    },
  });
}

function* addLetterSaga({ payload: { letter, idx } }) {
  const word = yield select(state => state.master.word);
  const answer = yield select(state => state.master.answer);
  const words = yield select(state => state.master.words);
  const unitProgress = yield select(state => state.master.unitProgress);
  let { amount, wIdx } = yield select(state => state.master.mistakes);

  let aIdx = 0;
  if (!idx) {
    aIdx = R.findIndex(R.equals(letter))(words);
  } else {
    aIdx = idx;
  }

  const nextIdx = answer.join('').length;
  // check that nex letter is correct
  const isCorrectLetter = word[nextIdx] === letter;

  if (!isCorrectLetter) {
    wIdx = aIdx;
    amount += 1;
    yield put({ type: UPDATE_STATE, payload: { mistakes: { amount, wIdx } } });
  }

  if (isCorrectLetter) {
    answer[nextIdx] = letter;

    const updatedWords = R.remove(aIdx, 1, words);

    const isWordCompleted = nextIdx === (answer.length - 1);

    if (isWordCompleted) {
      const { step, wordsSet } = unitProgress;
      const nextStep = step + 1;
      const next = wordsSet[nextStep];
      if (!next) {
        const updatedUnitProgress = R.mergeRight(unitProgress,
          { isFinished: true });

        const updatedProgress = wordsSet.map(w => ({
          id: w.id,
          progress: w.progress ? w.progress + 20 : 20,
        }));

        yield API.post('notes', '/vocabulary', {
          body: updatedProgress,
        });

        yield put({
          type: UPDATE_STATE,
          payload: { unitProgress: updatedUnitProgress },
        });
        return;
      }

      const updatedUnitProgress = R.mergeRight(unitProgress,
        { step: nextStep });

      const { translation, word: nextWord } = next;
      const wordsNext = shuffle(nextWord.split(''));
      const answerNext = wordsNext.map(() => '');

      yield put({
        type: UPDATE_STATE,
        payload: {
          word: nextWord,
          words: wordsNext,
          answer: answerNext,
          translation,
          unitProgress: updatedUnitProgress,
        },
      });

      return;
    }

    yield put({
      type: UPDATE_STATE,
      payload: {
        answer,
        words: updatedWords,
        mistakes: { wIdx: -1, amount },
      },
    });
  }
}

export function* watchMasterSagas() {
  yield takeEvery(FETCH_CONSTRUCTOR_SET, fetchConstructorSetSaga);
  yield takeEvery(ADD_LETTER, addLetterSaga);
}
