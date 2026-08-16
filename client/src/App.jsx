import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test'

import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './pages/home/Home.jsx'
import Groups from './pages/groups/Groups.jsx'
import Events from './pages/events/Events.jsx'
import Profile from './pages/profile/Profile.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProtectedLayout from './components/ProtectedLayout.jsx'

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>

  )
}

export default App
