import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test'

import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './pages/home/Home.jsx'
import Groups from './pages/groups/Groups.jsx'
import Events from './pages/events/Events.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import { useAuth } from './context/hooks/useAuth.js'

const App = () => {
  const { user, loading } = useAuth()
  if (loading) return <p>Chargement...</p>
  console.log(user)

  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

    </Routes>

  )
}

export default App
