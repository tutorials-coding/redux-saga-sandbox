export const getUserAlbums = (userId) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  ).then((response) => response.json())
}
