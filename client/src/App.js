import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import funRetroDeluxe from './js/reducers/index'
import './App.css'

import Boards from './components/boards'
import MainNav from './components/main-nav'

let store = createStore(
  funRetroDeluxe,
  applyMiddleware( thunk )
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MainNav />
          <Boards />
        </div>
      </Provider>
    )
  }
}

export default App
