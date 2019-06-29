import { createAction } from 'redux-actions';
import { takeEvery, put } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import config from '../secrets/config';

export const UPDATE_STATE = 'auth/UPDATE_STATE';
export const HANDLE_FB_AUTH = 'auth/HANDLE_FB_AUTH';
export const HANDLE_LOG_OUT = 'auth/HANDLE_LOG_OUT';
export const USER_AUTHENTICATED = 'auth/USER_AUTHENTICATED';
export const HANDLE_AUTHENTICATED = 'auth/HANDLE_AUTHENTICATED';
export const LOAD_FACEBOOK_SDK = 'auth/LOAD_FACEBOOK_SDK';
export const HANDLE_CHECK_AUTH = 'auth/HANDLE_CHECK_AUTH';

export const updateState = createAction(UPDATE_STATE);
export const handleFBAuth = createAction(HANDLE_FB_AUTH);
export const handleLogOut = createAction(HANDLE_LOG_OUT);
export const userAuthenticated = createAction(HANDLE_AUTHENTICATED);
export const loadFBSDK = createAction(LOAD_FACEBOOK_SDK);
export const checkAuth = createAction(HANDLE_CHECK_AUTH);

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

export function* handleUserAuthenticatedSaga() {
  yield put({ type: UPDATE_STATE, payload: { isAuthenticated: true } });
  yield put({ type: USER_AUTHENTICATED });
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
    yield put({ type: USER_AUTHENTICATED });
  } catch (e) {
    console.log('invalid auth', e);
  }
}

export function* handleLogOutSaga() {
  yield Auth.signOut();
  yield put({ type: UPDATE_STATE, payload: { isAuthenticated: false } });
}

export function handleLoadFacebookSDKSaga() {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: config.social.FB,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.1',
    });
  };

  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

export function* handleCheckAuthSaga() {
  try {
    yield Auth.currentAuthenticatedUser();
    yield put({ type: UPDATE_STATE, payload: { isAuthenticated: false } });

    yield handleUserAuthenticatedSaga();
  } catch (e) {
    if (e !== 'not authenticated') {
      alert(JSON.stringify(e));
    }
  }

  yield put({ type: UPDATE_STATE, payload: { isAuthenticating: false } });
}

export function* watchAuthSagas() {
  yield takeEvery(HANDLE_FB_AUTH, handleFBAuthSaga);
  yield takeEvery(HANDLE_LOG_OUT, handleLogOutSaga);
  yield takeEvery(HANDLE_AUTHENTICATED, handleUserAuthenticatedSaga);
  yield takeEvery(LOAD_FACEBOOK_SDK, handleLoadFacebookSDKSaga);
  yield takeEvery(HANDLE_CHECK_AUTH, handleCheckAuthSaga);
}
