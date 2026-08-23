import { Link } from 'react-router-dom'
import styles from '../styles/notFound.module.css'

const NotFound = () => {
    return (
        <main className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>
                Cette page n'existe pas.
            </p>
            <Link to="/" className={styles.homeLink}>
                Retour à l'accueil
            </Link>
        </main>
    )
}

export default NotFound