import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index'

// create our own logger with the setting we want
const logger = createLogger({
  collapsed: true
})

let store = createStore(
  rootReducer,
  // Note: logger must be the last middleware to be applied
  applyMiddleware(thunk, logger)
)

export default store
