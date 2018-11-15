import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  // compose,
} from 'redux'
import reducers from './reducers'
import App from './App'

// const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose;
// const enhancer = composeEnhancers();
const store = createStore(reducers, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
