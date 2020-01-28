import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index'

// create our own logger with the setting we want
var logger = createLogger({
  collapsed: true
})

var store = createStore(
  rootReducer,
  // Note: logger must be the last middleware to be applied
  applyMiddleware(thunk, logger)
)

export default store
