import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'

import App from './App'
import './styles/global.css'

const bootstrapReact = () => {
  const root = createRoot(document.getElementById('root'))

  root.render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
}

bootstrapReact()
