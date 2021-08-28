import { call, fork, put, take, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'
import { getUserPosts } from '../api/posts'

function* fetchUserPosts(action) {
  try {
    console.log(
      `Processing action: ${action.type}; dispatch id: ${action.payload.id}`
    )
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

export function* userPostsFetchRequestedWatcherWithBufferSaga() {
  const requestChannel = yield actionChannel(
    USER_POSTS_FETCH_REQUESTED,
    // buffers.none() // no buffering, new messages will be lost if there are no pending takers
    // buffers.fixed(2) // new messages will be buffered up to limit, overflow will raise an Error
    // buffers.expanding(1) // like fixed but Overflow will cause the buffer to expand dynamically
    // buffers.dropping(2) // same as fixed but Overflow will silently drop the messages
    buffers.sliding(2) // same as fixed but Overflow will insert the new message at the end and drop the oldest message in the buffer
  )

  while (true) {
    const action = yield take(requestChannel)
    yield call(fetchUserPosts, action) // fork will no block - buffer will be freed fast
  }
}
