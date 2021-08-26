import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { getUserPosts } from '../api/posts'
import { fetchUserPosts } from './sagas'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'

describe('fetchUserPosts', () => {
  it('fetches user data', () => {
    const userId = 'user-id-1'
    const action = {
      payload: {
        userId,
      },
    }

    const g = fetchUserPosts(action)
    expect(g.next().value).toEqual(call(getUserPosts, userId))

    const userPosts = [{ id: 'user-post-id-1' }]
    expect(g.next(userPosts).value).toEqual(
      put({
        type: USER_POSTS_FETCH_SUCCEEDED,
        payload: {
          data: userPosts,
        },
      })
    )

    expect(g.next().done).toEqual(true)
  })
})
