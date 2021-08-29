import { call, put, take, actionChannel, getContext } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'

function* fetchUserPosts(action) {
  try {
    const postsApi = yield getContext('postsApi')
    const userPosts = yield call(postsApi.getUserPosts, action.payload.userId)

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
  const requestChannel = yield actionChannel(
    USER_POSTS_FETCH_REQUESTED,
    buffers.none()
  )
  while (true) {
    const action = yield take(requestChannel)
    yield call(fetchUserPosts, action)
  }
}
