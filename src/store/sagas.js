import { call, put, takeEvery } from 'redux-saga/effects'
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
  } catch (e) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: e.message },
    })
  }
}

export function* saga() {
  yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
}
