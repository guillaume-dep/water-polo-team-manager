import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './pages/home/Home.jsx'

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated */}
      <Route path="/" element={<Home />} />

    </Routes>
  )
}

export default App
