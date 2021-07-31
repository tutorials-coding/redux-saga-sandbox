import {
  call,
  put,
  take,
  fork,
  cancel,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'
import { getUserPosts } from '../api/posts'

function* fetchUserPosts(action) {
  try {
    const userPosts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    })
    console.log(
      `put posts: ${userPosts.length}; action id: ${action.payload.id}`
    )
  } catch (e) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: e.message },
    })
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  // yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
  // yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
  // yield takeLeading(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)

  // just take example
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED)
    yield call(fetchUserPosts, action)
  }

  // // takeEvery
  // while (true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield fork(fetchUserPosts, action)
  // }

  // // takeLeading
  // while (true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield call(fetchUserPosts, action)
  // }

  // // takeLatest
  // let task
  // while (true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   if (task) {
  //     yield cancel(task)
  //   }
  //   task = yield fork(fetchUserPosts, action)
  // }

  // skip n tasks
  // while (true) {
  //   yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield take(USER_POSTS_FETCH_REQUESTED)
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield fork(fetchUserPosts, action)
  // }
}

export function* takeSaga() {
  yield userPostsFetchRequestedWatcherSaga()
}
