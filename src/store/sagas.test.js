import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  delay,
} from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { getUserPosts } from '../api/posts'
import { fetchUserPosts } from './sagas'
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from './actions'

describe('fetchUserPosts happy path', () => {
  it('fetches user data', () => {
    const userId = 'user-id-1'
    const action = {
      payload: {
        userId,
      },
    }

    const g = fetchUserPosts(action)
    expect(g.next().value).toEqual(delay(100))

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

describe('fetchUserPosts branching', () => {
  const userId = 'user-id-1'
  const action = {
    payload: {
      userId,
    },
  }

  const g = cloneableGenerator(fetchUserPosts)(action)
  g.next() // delay

  it('puts user data to store if no errors', () => {
    const gClone = g.clone()

    expect(gClone.next().value).toEqual(call(getUserPosts, userId))

    const userPosts = [{ id: 'user-post-id-1' }]
    expect(gClone.next(userPosts).value).toEqual(
      put({
        type: USER_POSTS_FETCH_SUCCEEDED,
        payload: {
          data: userPosts,
        },
      })
    )

    expect(gClone.next().done).toEqual(true)
  })

  it('puts error data to store if errors was thrown', () => {
    const gClone = g.clone()

    const errorMessage = 'Request failed'

    gClone.next() // call

    expect(
      gClone.throw({
        message: errorMessage,
      }).value
    ).toEqual(
      put({
        type: USER_POSTS_FETCH_FAILED,
        payload: { message: errorMessage },
      })
    )

    expect(gClone.next().done).toEqual(true)
  })
})
