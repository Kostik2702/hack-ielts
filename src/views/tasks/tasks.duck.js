import {createAction} from 'redux-actions';
import {takeEvery, put} from 'redux-saga/effects';
import {API} from "aws-amplify";

export const UPDATE_STATE = 'UPDATE_STATE';
export const FETCH_WRITING_TASKS = 'FETCH_WRITING_TASKS';
export const FETCH_READING_TASKS = 'FETCH_READING_TASKS';

export const updateState = createAction(UPDATE_STATE);
export const fetchWritingTasks = createAction(FETCH_WRITING_TASKS);
export const fetchReadingTasks = createAction(FETCH_READING_TASKS);

const initialState = {
  writingTasks: [],
  readingTasks: [],
};

export default function tasksReducer(state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function* fetchWritingTasksSaga() {
  const response = yield API.get("tasks", "/writing-tasks");
  const { writing_tasks } = response.body;
  yield put({ type: UPDATE_STATE, payload: { writingTasks: writing_tasks } });
}

export function* fetchReadingTasksSaga() {
  const response = yield API.get("notes", "/tasks");
  if (response.length === 0) {
    return;
  }
  yield put({ type: UPDATE_STATE, payload: { readingTasks: response } });
}

export function* watchTasksSagas() {
  yield takeEvery(FETCH_READING_TASKS, fetchReadingTasksSaga);
  yield takeEvery(FETCH_WRITING_TASKS, fetchWritingTasksSaga);
}
