import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import ScrollToTop from './components/ScrollToTop'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <TripProvider>
        <App />
      </TripProvider>
    </BrowserRouter>
  </React.StrictMode>
)
