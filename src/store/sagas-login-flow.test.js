import { take, fork, cancel } from 'redux-saga/effects'
import { createMockTask } from '@redux-saga/testing-utils'

import { loginFlow, authorize } from './sagas-login-flow'
import { LOGIN_REQUEST, LOGOUT, LOGIN_ERROR } from './actions'

describe('loginFlow', () => {
  const g = loginFlow()

  it('waits to start an action', () => {
    const expectedYield = take(LOGIN_REQUEST)
    expect(g.next().value).toEqual(expectedYield)
  })

  it('fork authorize task', () => {
    const username = 'test-username'
    const password = 'test-password'

    const expectedYield = fork(authorize, username, password)
    const mockedAction = {
      type: LOGIN_REQUEST,
      payload: {
        username,
        password,
      },
    }

    expect(g.next(mockedAction).value).toEqual(expectedYield)
  })

  it('waits for logout action and then cancels the task', () => {
    const mockTask = createMockTask()

    const expectedTakeYield = take([LOGOUT, LOGIN_ERROR])
    expect(g.next(mockTask).value).toEqual(expectedTakeYield)

    const expectedCancelYield = cancel(mockTask)
    expect(
      g.next({
        type: LOGOUT,
      }).value
    ).toEqual(expectedCancelYield)
  })
})
