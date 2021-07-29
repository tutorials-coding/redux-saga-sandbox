import { combineReducers } from 'redux'
import { reducer } from './reducer'
import { loginFlowReducer } from './login-flow-reducer'

export const rootReducer = combineReducers({
  app: reducer,
  user: loginFlowReducer,
})
