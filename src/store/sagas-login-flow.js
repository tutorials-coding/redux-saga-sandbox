import { take, call, put, fork } from 'redux-saga/effects'
import * as userApi from '../api/user'

import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './actions'

// This case is not covered by the flow:
// Now LOGOUT is not missed, but
// LOGOUT in the middle of an userApi.login call - need to cancel the authorize process

function* authorize(username, password) {
  try {
    // fork, but how to get the result (token) - so, save token here
    const token = yield call(userApi.login, username, password)
    yield put({ type: LOGIN_SUCCESS, payload: { token } })
    yield call(userApi.saveToken, token)
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: { error } })
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    yield fork(authorize, payload.username, payload.password)

    // watching for two concurrent actions
    yield take([LOGOUT, LOGIN_ERROR])
    yield call(userApi.clearToken)
  }
}

export function* loginFlowSaga() {
  yield loginFlow()
}
