import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/configureStore'
import { Provider } from 'react-redux'
import App from './App'
import './scss/styles_modern.scss'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
