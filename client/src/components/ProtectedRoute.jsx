import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/hooks/useAuth.js'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return null  /* SPINNER */
    if (!user) return <Navigate to="/login" />
    return children
}

export default ProtectedRoute