import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AbrasaApp } from './AbrasaApp'
import { store } from './store/store'
import './scss/app.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <AbrasaApp />
    </Provider>
  </React.StrictMode>,
)
