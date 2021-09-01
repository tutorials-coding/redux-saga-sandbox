import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {
  requestUserPosts,
  USER_POSTS_FETCH_REQUESTED,
  LOGIN_REQUEST,
  LOGOUT,
  FILES_UPLOADING_START,
  CHANGE_USERNAME,
  USER_POSTS_FETCH_CANCEL,
} from './store/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const isLoginPending = useSelector((state) => state.user.isLoginPending)
  const error = useSelector((state) => state.user.error)
  const token = useSelector((state) => state.user.token)
  const filesUploadingProgress = useSelector(
    (state) => state.app.filesUploadingProgress
  )

  const handleCancelTask = () => {
    dispatch({
      type: USER_POSTS_FETCH_CANCEL,
    })
  }

  const handleClick = () => {
    dispatch(
      requestUserPosts({
        userId: 1,
        dispatchId: 1,
      })
    )

    // try {
    //   for (let dispatchId = 1; dispatchId <= 4; dispatchId++) {
    //     dispatch(
    //       requestUserPosts({
    //         userId: 1,
    //         dispatchId,
    //       })
    //     )
    //   }
    // } catch (e) {
    //   console.log('error', e.message) // error Channel's Buffer overflow!
    // }

    // setTimeout(() => {
    //   dispatch({
    //     type: USER_POSTS_FETCH_REQUESTED,
    //     payload: { userId: 1, id: 5 },
    //   })
    //   dispatch({
    //     type: USER_POSTS_FETCH_REQUESTED,
    //     payload: { userId: 1, id: 6 },
    //   })
    //   dispatch({
    //     type: USER_POSTS_FETCH_REQUESTED,
    //     payload: { userId: 1, id: 7 },
    //   })
    //   dispatch({
    //     type: USER_POSTS_FETCH_REQUESTED,
    //     payload: { userId: 1, id: 8 },
    //   })
    // }, 60)
  }

  const handleLoginClick = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username: 'user1',
        password: 'user1password',
      },
    })
  }
  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT })
  }

  const handleUploadClick = () => {
    dispatch({ type: FILES_UPLOADING_START })
  }

  const handleUsernameChange = (event) => {
    dispatch({
      type: CHANGE_USERNAME,
      payload: {
        username: event.target.value,
      },
    })
  }

  return (
    <div className="app__container">
      <Button onClick={handleClick}>Get posts</Button>
      <Button onClick={handleCancelTask}>Cancel task</Button>

      <div className="app__login-container">
        <Button onClick={handleLoginClick}>Log in</Button>
        <Button onClick={handleLogoutClick}>Log out</Button>
        {isLoginPending && <p>Logging in...</p>}
        {error && <p>Error: {error}</p>}
        {token && <p>{token}</p>}
      </div>
      <div className="app__login-container">
        <Button onClick={handleUploadClick}>Upload files</Button>
        <p>Uploading progress {filesUploadingProgress}</p>
      </div>

      <div className="app__login-container">
        <Form.Control
          size="md"
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </div>
    </div>
  )
}

export default App
