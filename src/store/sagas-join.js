import { fork, call, put, delay, spawn, join } from 'redux-saga/effects'
import { getUserPosts } from '../api/posts'
import { getUserAlbums } from '../api/albums'
import { SAVE_USER_ALBUMS, SAVE_USER_POSTS } from './actions'

function* fetchAlbums(userId) {
  const data = yield call(getUserAlbums, userId)
  yield put({
    type: SAVE_USER_ALBUMS,
    payload: { data },
  })
  console.log('albums fetched')
}
function* fetchPosts(userId) {
  const data = yield call(getUserPosts, userId)
  yield put({
    type: SAVE_USER_POSTS,
    payload: { data },
  })
  console.log('posts fetched')
}

function* fetchUserData(userId) {
  yield delay(3000)

  const postsTask = yield fork(fetchAlbums, userId)
  // yield join(postsTask)

  const albumsTask = yield fork(fetchPosts, userId)
  yield join([postsTask, albumsTask])

  console.log('done')
}

export function* sagaJoin() {
  const userId = 1
  yield call(fetchUserData, userId)
}
