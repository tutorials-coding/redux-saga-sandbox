import { call, put, take, actionChannel } from 'redux-saga/effects'
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
  const requestChannel = yield actionChannel(USER_POSTS_FETCH_REQUESTED)
  while (true) {
    const action = yield take(requestChannel)
    console.log('action', action)
    yield call(fetchUserPosts, action)
  }
}
