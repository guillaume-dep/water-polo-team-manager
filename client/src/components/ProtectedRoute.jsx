import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/hooks/useAuth.js'

const ProtectedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>Chargement...</p>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute