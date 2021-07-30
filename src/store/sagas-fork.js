import { fork, call, put, delay } from 'redux-saga/effects'
import { getUserPosts } from '../api/posts'
import { getUserAlbums } from '../api/albums'
import { SAVE_USER_ALBUMS, SAVE_USER_POSTS } from './actions'

function* fetchAlbums(userId) {
  const data = yield call(getUserAlbums, userId)
  yield put({
    type: SAVE_USER_ALBUMS,
    payload: { data },
  })
}
function* fetchPosts(userId) {
  const data = yield call(getUserPosts, userId)
  yield put({
    type: SAVE_USER_POSTS,
    payload: { data },
  })
}

function* fetchUserData(userId) {
  const postsTask = yield fork(fetchAlbums, userId)
  const albumsTask = yield fork(fetchPosts, userId)
  yield delay(3000)
  console.log('done')
}

export function* forkSaga() {
  const userId = 1
  yield call(fetchUserData, userId)
}
