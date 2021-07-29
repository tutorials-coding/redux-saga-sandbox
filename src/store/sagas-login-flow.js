import { take, call, put } from 'redux-saga/effects'
import * as userApi from '../api/user'

import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './actions'

// This case is not covered by the flow:
// LOGIN_REQUEST (waiting) -> LOGOUT (missed) -> LOGIN_SUCCESS

function* authorize(username, password) {
  try {
    const token = yield call(userApi.login, username, password)
    yield put({ type: LOGIN_SUCCESS, payload: { token } })
    return token
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: { error } })
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    const token = yield call(authorize, payload.username, payload.password)
    if (token) {
      yield call(userApi.saveToken, token)
      yield take(LOGOUT)
      yield call(userApi.clearToken)
    }
  }
}

export function* loginFlowSaga() {
  yield loginFlow()
}
