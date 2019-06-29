import { createAction } from 'redux-actions';
import {
  takeEvery, put, take, select, all,
} from 'redux-saga/effects';
import { API } from 'aws-amplify';

import { USER_AUTHENTICATED } from './auth.duck';

export const UPDATE_STATE = 'app/UPDATE_STATE';
export const FETCH_USER_CONFIG = 'app/USER_CONFIG';
export const USER_CONFIG_LOADED = 'app/USER_CONFIG_LOADED';
export const UPDATE_LOADER = 'app/UPDATE_LOADER';
export const UPDATE_USER_CONFIG = 'app/UPDATE_USER_CONFIG';

export const updateState = createAction(UPDATE_STATE);
export const fetchUserConfig = createAction(FETCH_USER_CONFIG);
export const updateUserConfig = createAction(UPDATE_USER_CONFIG);
export const updateLoader = createAction(UPDATE_LOADER);

const initialState = {
  loading: false,
  showCountrySelector: false,
  userConfig: {
    countryCode: null,
  },
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function* handleFetchUserConfigSaga() {
  const isAuthenticated = yield select(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    yield take(USER_AUTHENTICATED);
  }

  const response = yield API.get('notes', '/user/config');
  const userConfig = response[0].params;
  if (userConfig) {
    yield put({ type: UPDATE_STATE, payload: { userConfig } });
  }
  yield put({ type: USER_CONFIG_LOADED });
  yield put({ type: UPDATE_STATE, payload: { loading: false } });
}

export function* handleUpdateUserConfigSaga(event) {
  const { payload } = event;
  const { code } = payload;

  yield put({ type: UPDATE_STATE, payload: { loading: true } });
  const res = yield API.put('notes', '/user/config',
    { body: { params: { countryCode: code } } });
  yield put({ type: UPDATE_STATE, payload: { userConfig: res.params, loading: false } });
}

export function* handleUpdateLoaderSaga(event) {
  const { payload } = event;
  yield put({ type: UPDATE_STATE, payload: { loading: payload.loading } });
}

export function* waitForCountrySelectorSaga() {
  while (true) {
    yield all([
      take(USER_AUTHENTICATED),
      take(USER_CONFIG_LOADED),
    ]);
    const userConfig = yield select(state => state.app.userConfig);
    if (!userConfig.countryCode) {
      yield put({ type: UPDATE_STATE, payload: { showCountrySelector: true } });
    }
  }
}

export function* watchAppSagas() {
  yield takeEvery(FETCH_USER_CONFIG, handleFetchUserConfigSaga);
  yield takeEvery(UPDATE_USER_CONFIG, handleUpdateUserConfigSaga);
  yield takeEvery(UPDATE_LOADER, handleUpdateLoaderSaga);
  yield waitForCountrySelectorSaga();
}
