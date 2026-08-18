import styles from '../../styles/groups/groupCard.module.css'

const GroupCard = ({ groups, isLoading }) => {

    const renderGroups = () => {
        if (isLoading) {
            return (
                <div className={styles.statusContainer}>
                    <span className={styles.spinner}></span>
                    <p>Chargement des groupes...</p>
                </div>
            )
        }

        if (!groups || groups.length === 0) {
            return (
                <div className={styles.statusContainer}>
                    <p>Vous n'avez aucun groupe pour le moment.</p>
                </div>
            )
        }

        return (
            <div className={styles.list}>
                {groups.map((group) => (
                    <article className={styles.groupCard} key={group._id}>
                        <div className={styles.groupIconContainer}>
                            <svg
                                className={styles.groupIcon}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>

                        <div className={styles.groupDetails}>
                            <div className={styles.groupHeaderInfo}>
                                <div className={styles.titleAndTag}>
                                    <h3>{group.name}</h3>
                                    <span className={styles.codeTag}>
                                        Code - {group.code}
                                    </span>
                                </div>
                            </div>
                            <p>{group.coach.name}</p>
                        </div>
                    </article>
                ))}
            </div>
        )
    }

    return (
        <section className={styles.container}>
            {renderGroups()}
        </section>
    )
}

export default GroupCard