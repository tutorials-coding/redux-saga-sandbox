import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'

import { USER_POSTS_FETCH_REQUESTED } from './store/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } })
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } })
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } })
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } })
  }

  return (
    <div className="app__container">
      <Button onClick={handleClick}>Get posts</Button>
    </div>
  )
}

export default App
