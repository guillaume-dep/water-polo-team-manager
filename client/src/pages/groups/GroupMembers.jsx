import { useParams, NavLink } from 'react-router-dom'
import { getGroup } from '../../api/groups.js'
import { useEffect, useState } from 'react'
import PersonCard from '../../components/PersonCard.jsx'

import wpBall from '../../../images/wp-ball.jpg'
import styles from '../../styles/groups/groupMembers.module.css'
import { useAuth } from '../../context/hooks/useAuth.js'
import ROLE from '../../../../shared/utils/role.js'

const GroupMembers = () => {
    const groupId = useParams().id
    const { user } = useAuth()

    const [group, setGroup] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const isCoach = user.role === ROLE.COACH
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

                        {isCoach && <span className={styles.codeTag}>
                            Code - {group.code}
                        </span>}

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

                        {isCoach && <NavLink
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
                        </NavLink>}
                    </div>

                    {group.members.length === 0 ? (
                        <div className={styles.statusContainer}>
                            <p>Aucun membre dans ce groupe.</p>
                        </div>
                    ) : (
                        <div className={styles.membersList}>
                            {group.members.map((member) => (
                                <PersonCard
                                    key={member._id}
                                    person={member}
                                    showEmail={isCoach}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default GroupMembers