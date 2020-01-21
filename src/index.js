import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/configureStore'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

console.log('fred fred fred fred fred fred fred fred fred fred fred fred fred provider', Provider)
console.log('fred fred fred fred fred fred fred fred fred fred fred fred fred store ', store)

// const mapStateToProps = state => {
//   console.log(state);
// };
// // Use connect enhancer, when the parent is wrapped with <Provider>
//const App = connect(mapStateToProps)

ReactDOM.render(<Provider store={store}><App testProp="hello" /></Provider>, document.getElementById('root'))
//ReactDOM.render(<App />, document.getElementById('root'))
