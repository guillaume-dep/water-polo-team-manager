import { useParams, NavLink } from 'react-router-dom'
import { getGroup } from '../../api/groups.js'
import { useEffect, useState } from 'react'

import wpBall from '../../../images/wp-ball.jpg'
import styles from '../../styles/groups/groupMembers.module.css'

const GroupMembers = () => {
    const groupId = useParams().id

    const [group, setGroup] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const data = await getGroup(groupId)
                setGroup(data)
            } catch (err) {
                console.error(
                    'Error occured while retrieving group',
                    err
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchGroup()
    }, [groupId])

    if (isLoading) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.statusContainer}>
                        <span className={styles.spinner}></span>
                        <p>Chargement du groupe...</p>
                    </div>
                </div>
            </main>
        )
    }

    if (!group) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.statusContainer}>
                        <p>Groupe introuvable.</p>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.headerCard}>
                    <img
                        src={wpBall}
                        alt="Ballon de water-polo"
                        className={styles.groupBallImage}
                    />

                    <div className={styles.groupMainInfo}>
                        <h1 className={styles.groupTitle}>{group.name}</h1>

                        <span className={styles.codeTag}>
                            Code - {group.code}
                        </span>
                        <p className={styles.coachName}>
                            Coach : {group.coach?.name || 'Non assigné'}
                        </p>
                    </div>
                </header>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitleGroup}>
                            <h2 className={styles.sectionTitle}>Membres</h2>
                            <span className={styles.memberCount}>
                                {group.members.length}
                            </span>
                        </div>

                        <NavLink
                            to={`/groups/${groupId}/pending-requests`}
                            className={styles.actionBtn}
                        >
                            <span>Demandes</span>
                            <svg
                                className={styles.arrowIcon}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </NavLink>
                    </div>

                    {group.members.length === 0 ? (
                        <div className={styles.statusContainer}>
                            <p>Aucun membre dans ce groupe.</p>
                        </div>
                    ) : (
                        <div className={styles.membersList}>
                            {group.members.map((member) => (
                                <article key={member._id} className={styles.memberCard}>
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
                                        <h3 className={styles.memberName}>{member.name}</h3>
                                        {member.email && (
                                            <p className={styles.memberMeta}>{member.email}</p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default GroupMembers