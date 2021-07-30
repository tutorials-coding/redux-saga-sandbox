import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './store/reducers/rootReducer'
import { rootSaga } from './store/sagas'
import { userPostsFetchRequestedWatcherSaga } from './store/sagas-with-action-channel'
import { loginFlowSaga } from './store/sagas-login-flow'
import { forkSaga } from './store/sagas-fork'

import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

// sagaMiddleware.run(rootSaga)
// sagaMiddleware.run(userPostsFetchRequestedWatcherSaga)
// sagaMiddleware.run(loginFlowSaga)
sagaMiddleware.run(forkSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
