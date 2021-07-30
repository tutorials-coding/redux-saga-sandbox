export const getUserPosts = (userId) => {
  // throw new Error('Fetching posts failed')
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  ).then((response) => response.json())
}
