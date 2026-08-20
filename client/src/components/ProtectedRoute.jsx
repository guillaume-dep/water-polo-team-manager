import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/hooks/useAuth.js'
import styles from '../styles/protectedRoute.module.css' // Crée ce fichier CSS

const ProtectedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Chargement...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute