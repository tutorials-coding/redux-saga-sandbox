import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'

import { USER_POSTS_FETCH_REQUESTED } from './store/actions'
import { LOGIN_REQUEST, LOGOUT, FILES_UPLOADING_START } from './store/actions'
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

  const handleClick = () => {
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: { userId: 1, id: 1 },
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: { userId: 1, id: 2 },
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: { userId: 1, id: 3 },
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: { userId: 1, id: 4 },
    })

    setTimeout(() => {
      dispatch({
        type: USER_POSTS_FETCH_REQUESTED,
        payload: { userId: 1, id: 5 },
      })
      dispatch({
        type: USER_POSTS_FETCH_REQUESTED,
        payload: { userId: 1, id: 6 },
      })
      dispatch({
        type: USER_POSTS_FETCH_REQUESTED,
        payload: { userId: 1, id: 7 },
      })
      dispatch({
        type: USER_POSTS_FETCH_REQUESTED,
        payload: { userId: 1, id: 8 },
      })
    }, 60)
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

  return (
    <div className="app__container">
      <Button onClick={handleClick}>Get posts</Button>

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
    </div>
  )
}

export default App
