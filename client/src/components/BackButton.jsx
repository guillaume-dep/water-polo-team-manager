import { useNavigate } from 'react-router-dom'

import styles from '../styles/backButton.module.css'

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.backButton}
            aria-label="Retour"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
    )
}

export default BackButton