import { runSaga } from 'redux-saga'
import { call, put, delay } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import * as postsApi from '../api/posts'
import { fetchUserPosts } from './sagas'
import { USER_POSTS_FETCH_SUCCEEDED, USER_POSTS_FETCH_FAILED } from './actions'

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

    expect(g.next().value).toEqual(call(postsApi.getUserPosts, userId))

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

    expect(gClone.next().value).toEqual(call(postsApi.getUserPosts, userId))

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

describe('fetchUserPosts full saga', () => {
  const userId = 'user-id-1'
  const action = {
    payload: {
      userId,
    },
  }

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('puts user data to store if no errors', async () => {
    const userPosts = [{ id: 'user-post-id-1' }]
    postsApi.getUserPosts = jest.fn().mockResolvedValue(userPosts)

    const dispatched = []
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      },
      fetchUserPosts,
      action
    ).toPromise()

    expect(postsApi.getUserPosts).toHaveBeenCalledWith(userId)
    expect(dispatched).toEqual([
      {
        type: USER_POSTS_FETCH_SUCCEEDED,
        payload: {
          data: userPosts,
        },
      },
    ])
  })

  it('puts error data to store if errors was thrown', async () => {
    const errorMessage = 'Request failed'
    postsApi.getUserPosts = jest
      .fn()
      .mockRejectedValue({ message: errorMessage })

    const dispatched = []
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      },
      fetchUserPosts,
      action
    ).toPromise()

    expect(postsApi.getUserPosts).toHaveBeenCalledWith(userId)
    expect(dispatched).toEqual([
      {
        type: USER_POSTS_FETCH_FAILED,
        payload: {
          message: errorMessage,
        },
      },
    ])
  })
})
