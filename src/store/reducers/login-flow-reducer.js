import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  STOP_LOGING_PENDING,
  LOGOUT,
} from '../actions'

const initState = {
  error: null,
  token: null,
  isLoginPending: false,
}

export const loginFlowReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR: {
      const error = action.payload.error
      return {
        ...state,
        error,
        isLoginPending: false,
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        error: null,
        isLoginPending: true,
      }
    }
    case LOGIN_SUCCESS: {
      const token = action.payload.token
      return {
        ...state,
        token,
        isLoginPending: false,
      }
    }
    case STOP_LOGING_PENDING: {
      return {
        ...state,
        isLoginPending: false,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        error: null,
        token: null,
      }
    }
    default:
      return state
  }
}
