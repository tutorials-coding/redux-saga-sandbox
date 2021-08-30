import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  delay,
  select,
} from 'redux-saga/effects'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'
import { getUserPosts } from '../api/posts'

export function* fetchUserPosts(action) {
  yield delay(100)
  try {
    const data = yield select()
    console.log('store data', data)
    const userPosts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    })
  } catch (e) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: e.message },
    })
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
}

export function* someSaga() {
  console.log('Some Saga')
}

export function* rootSaga() {
  yield all([userPostsFetchRequestedWatcherSaga(), someSaga()])
}
