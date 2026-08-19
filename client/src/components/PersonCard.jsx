import styles from '../styles/personCard.module.css'

const PersonCard = ({ person }) => {
    return (
        <article key={person._id} className={styles.memberCard}>
            <div className={styles.avatar}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </div>
            <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{person.name}</h3>
                {person.email && (
                    <p className={styles.memberMeta}>{person.email}</p>
                )}
            </div>
        </article>
    )
}

export default PersonCard