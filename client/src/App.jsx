import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test'

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Test />} />
      <Route path="/register" element={<Test />} />

      {/* Authenticated */}
      <Route path="/" element={<Test />} />

    </Routes>
  )
}

export default App
