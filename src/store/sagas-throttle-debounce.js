import { fork, call, take, throttle } from 'redux-saga/effects'

import { saveFriendlyName } from '../api/user'
import { CHANGE_USERNAME } from './actions'

function* changeUsername(action) {
  console.log('username', action.payload.username)
  yield call(saveFriendlyName, action.payload.username)
}

export function* sagaThrottleDebounce() {
  // compare with:
  // while (true) {
  //   const action = yield take(CHANGE_USERNAME)
  //   yield fork(changeUsername, action)
  // }
  yield throttle(500, CHANGE_USERNAME, changeUsername)
}
