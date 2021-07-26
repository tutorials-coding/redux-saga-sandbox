import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'
import { getUserPosts } from '../api/posts'

function* fetchUserPosts(action) {
  try {
    const callResult = call(getUserPosts, action.payload.userId)
    console.log('callResult', callResult)
    const userPosts = yield callResult
    const putResult = put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    })
    console.log('putResult', putResult)
    yield putResult
  } catch (e) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: e.message },
    })
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
}

export function* someSaga() {
  console.log('Some Saga')
}

export function* rootSaga() {
  yield all([userPostsFetchRequestedWatcherSaga(), someSaga()])
}
