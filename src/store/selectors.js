export const getUserPostsSelector = (state, query = '') =>
  state.app.posts.filter(
    (p) => p.title.includes(query) || p.body.includes(query)
  )
