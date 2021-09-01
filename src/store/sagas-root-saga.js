import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  delay,
  select,
  fork,
  spawn,
} from 'redux-saga/effects'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'
import { getUserPosts } from '../api/posts'
import { getUserPostsSelector } from './selectors'

export function* fetchUserPosts(action) {
  yield delay(100)
  try {
    const userPosts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    })

    // const data = yield select((state) => state.app.posts)
    const data = yield select(getUserPostsSelector, 'ab')
    console.log('posts', data)
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

// all
export function* rootSaga1() {
  yield all([userPostsFetchRequestedWatcherSaga(), someSaga()])
}

// fork
export function* rootSaga2() {
  yield fork(userPostsFetchRequestedWatcherSaga)
  yield fork(someSaga)
}

// wrap each saga in fork and pass to all
export function* rootSaga3() {
  yield all([fork(userPostsFetchRequestedWatcherSaga), fork(someSaga)])
}

// wrap each saga in spawn and pass to all
export function* rootSaga4() {
  yield spawn(userPostsFetchRequestedWatcherSaga)
  yield spawn(someSaga)
}

// spawn with restart
function* rootSaga4() {
  const sagas = [userPostsFetchRequestedWatcherSaga, someSaga]

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.log(e)
          }
        }
      })
    )
  )
}
