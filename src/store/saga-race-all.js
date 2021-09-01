import { call, put, all, delay, race, take } from 'redux-saga/effects'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
  USER_POSTS_FETCH_CANCEL,
  SAVE_USER_ALBUMS,
  SAVE_USER_POSTS,
} from './actions'
import { getUserPosts } from '../api/posts'
import { getUserAlbums } from '../api/albums'

export function* fetchUserPosts(action) {
  try {
    yield delay(1000) // to make task longer
    const userPosts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    })
    console.log('posts', userPosts)
    return userPosts
  } catch (e) {
    console.log('error', e)
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: e.message },
    })
  }
}

export function* raceExampleWatcherSaga() {
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED)
    // const [userPosts, userPostsCancelled] = yield race([
    //   fetchUserPosts(action),
    //   take(USER_POSTS_FETCH_CANCEL), // other sagas will be cancelled automatically
    // ])
    // console.log('userPosts', userPosts)
    // console.log('userPostsCancelled', userPostsCancelled)

    const { userPosts, userPostsCancelled } = yield race({
      userPosts: fetchUserPosts(action),
      userPostsCancelled: take(USER_POSTS_FETCH_CANCEL),
    })
    console.log('userPosts', userPosts)
    console.log('userPostsCancelled', userPostsCancelled)
  }
}

// all example
function* fetchAlbums(userId) {
  const data = yield call(getUserAlbums, userId)
  yield put({
    type: SAVE_USER_ALBUMS,
    payload: { data },
  })
  return data
}
function* fetchPosts(userId) {
  const data = yield call(getUserPosts, userId)
  yield put({
    type: SAVE_USER_POSTS,
    payload: { data },
  })
  return data
}

export function* allExampleWatcherSaga() {
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED)

    // const [userAlbums, userPosts] = yield all([
    //   fetchAlbums(action.payload.userId),
    //   fetchPosts(action.payload.userId),
    // ])
    // console.log('userAlbums', userAlbums)
    // console.log('userPosts', userPosts)

    const { userAlbums, userPosts } = yield all({
      userAlbums: fetchAlbums(action.payload.userId),
      userPosts: fetchPosts(action.payload.userId),
    })
    console.log('userAlbums', userAlbums)
    console.log('userPosts', userPosts)
  }
}
