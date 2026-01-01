import React from 'react'
import { Provider } from 'react-redux'
import { store } from "./store/store"
import { Quiz } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LSD from './pages/LSD'
import { listPage } from './constants/listPages'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LSD" element={<LSD />} />
          <Route path="/LSD/:quizId" element={<Quiz quizType="LSD" />} />
          {listPage.filter(p => p.href !== '/LSD').map((page) => (
            <Route key={page.id} path={page.href} element={<Quiz quizType={page.href.substring(1)} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

