import React from 'react'
import Quiz from './components/Quiz'
import { Provider } from 'react-redux'
import { store } from "./store/store"

export default function App() {
  return (
    <Provider store={store}>
      <Quiz />
    </Provider>
  )
}
