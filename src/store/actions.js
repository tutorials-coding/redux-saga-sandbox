export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const USER_POSTS_FETCH_REQUESTED = 'USER_POSTS_FETCH_REQUESTED'
export const USER_POSTS_FETCH_SUCCEEDED = 'USER_POSTS_FETCH_SUCCEEDED'
export const USER_POSTS_FETCH_FAILED = 'USER_POSTS_FETCH_FAILED'
export const requestUserPosts = ({ userId, dispatchId }) => {
  console.log(
    `Received action: USER_POSTS_FETCH_REQUESTED; dispatch id: ${dispatchId}`
  )
  return {
    type: USER_POSTS_FETCH_REQUESTED,
    payload: { userId, id: dispatchId },
  }
}

export const SAVE_USER_POSTS = 'SAVE_USER_POSTS'
export const SAVE_USER_ALBUMS = 'SAVE_USER_ALBUMS'

export const FILES_UPLOADING_START = 'FILES_UPLOADING_START'
export const FILES_UPLOADING_PROGRESS = 'FILES_UPLOADING_PROGRESS'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGOUT = 'LOGOUT'
export const STOP_LOGING_PENDING = 'STOP_LOGING_PENDING'
