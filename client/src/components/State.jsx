import styles from '../styles/state.module.css'

const State = ({ type, message }) => {
    // Vérifie que le type passé existe bien dans nos styles
    if (!['success', 'info', 'warning', 'error'].includes(type)) return null;

    return (
        <div
            role="alert"
            className={`${styles.container} ${styles[type]}`}
        >
            <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className={styles.icon}
            >
                <path
                    d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>

            <p className={styles.message}>
                {message}
            </p>
        </div>
    );
};

export default State;