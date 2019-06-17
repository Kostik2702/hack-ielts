import { createAction } from 'redux-actions';
import { takeEvery, put } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

export const UPDATE_STATE = 'UPDATE_STATE';
export const HANDLE_FB_AUTH = 'HANDLE_FB_AUTH';
export const HANDLE_LOG_OUT = 'HANDLE_LOG_OUT';

export const updateState = createAction(UPDATE_STATE);
export const handleFBAuth = createAction(HANDLE_FB_AUTH);
export const handleLogOut = createAction(HANDLE_LOG_OUT);

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function* handleFBAuthSaga(data) {
  const { payload } = data;


  const { email, accessToken: token, expiresIn } = payload;
  const expiresAt = expiresIn * 1000 + new Date().getTime();


  try {
    const user = { email };

    yield Auth.federatedSignIn(
      'facebook',
      { token, expires_at: expiresAt },
      user,
    );

    yield put({ type: UPDATE_STATE, payload: { isAuthenticated: true } });
  } catch (e) {
    console.log('invalid auth', e);
  }
}

export function* handleLogOutSaga() {
  yield Auth.signOut();
  yield put({ type: UPDATE_STATE, payload: { isAuthenticated: false } });
}

export function* watchAuthSagas() {
  yield takeEvery(HANDLE_FB_AUTH, handleFBAuthSaga);
  yield takeEvery(HANDLE_LOG_OUT, handleLogOutSaga);
}
