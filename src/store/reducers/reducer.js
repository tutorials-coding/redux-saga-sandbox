import {
  USER_POSTS_FETCH_SUCCEEDED,
  SAVE_USER_ALBUMS,
  SAVE_USER_POSTS,
} from '../actions'

const initState = {
  posts: null,
  albums: null,
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_POSTS_FETCH_SUCCEEDED: {
      const posts = action.payload.data
      return {
        ...state,
        posts,
      }
    }
    case SAVE_USER_ALBUMS: {
      const albums = action.payload.data
      return {
        ...state,
        albums,
      }
    }
    case SAVE_USER_POSTS: {
      const posts = action.payload.data
      return {
        ...state,
        posts,
      }
    }
    default:
      return state
  }
}
