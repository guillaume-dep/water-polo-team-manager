import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { getGroup, getJoinRequests, deleteGroup, leaveGroup } from '../../api/groups.js'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/hooks/useAuth.js'

import wpBall from '../../../images/wp-ball.jpg'
import PersonCard from '../../components/PersonCard.jsx'
import ROLE from '../../../../shared/utils/role.js'

import styles from '../../styles/groups/groupMembers.module.css'

const GroupMembers = () => {
    const groupId = useParams().id
    const { user } = useAuth()
    const navigate = useNavigate()

    const [group, setGroup] = useState(null)
    const [numberOfRequests, setNumberOfRequests] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    const isCoach = user.role === ROLE.COACH

    const handleDeleteGroup = async () => {
        if (!window.confirm("Es-tu sûr de vouloir supprimer ce groupe ? Cette action est irréversible.")) {
            return
        }

        try {
            setIsDeleting(true)
            await deleteGroup(groupId)
            navigate('/groups')
        } catch (error) {
            console.error("Error occured while deleting the group", error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleLeaveGroup = async () => {
        if (!window.confirm("Es-tu sûr de vouloir quitter ce groupe ?")) {
            return
        }

        try {
            setIsLeaving(true)
            await leaveGroup(groupId)
            navigate('/groups')
        } catch (error) {
            console.error("Error occured while leaving the group", error)
        } finally {
            setIsLeaving(false)
        }
    }

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const data = await getGroup(groupId)
                setGroup(data)
            } catch (err) {
                console.error('Error occured while retrieving group', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchGroup()
    }, [groupId])

    useEffect(() => {
        const fetchNumberOfRequests = async () => {
            try {
                const requests = await getJoinRequests(groupId)
                setNumberOfRequests(requests?.length || 0)
            } catch (err) {
                console.error("Error occured while retrieving number of requests", err)
            }
        }

        if (isCoach) {
            fetchNumberOfRequests()
        }
    }, [groupId, isCoach])

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
                    <div className={styles.headerCardContent}>
                        <img
                            src={wpBall}
                            alt="Ballon de water-polo"
                            className={styles.groupBallImage}
                        />

                        <div className={styles.groupMainInfo}>
                            <h1 className={styles.groupTitle}>{group.name}</h1>

                            {isCoach && (
                                <span className={styles.codeTag}>
                                    Code - {group.code}
                                </span>
                            )}

                            <p className={styles.coachName}>
                                Coach : {group.coach?.name || 'Non assigné'}
                            </p>
                        </div>
                    </div>

                    <div className={styles.deleteBtnContainer}>
                        {isCoach ? (
                            <button
                                type="button"
                                onClick={handleDeleteGroup}
                                disabled={isDeleting}
                                className={styles.deleteBtn}
                                title="Supprimer le groupe"
                                aria-label="Supprimer le groupe"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={styles.deleteIcon}
                                >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLeaveGroup}
                                disabled={isLeaving}
                                className={styles.deleteBtn}
                                title="Quitter le groupe"
                                aria-label="Quitter le groupe"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={styles.deleteIcon}
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        )}
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

                        {isCoach && (
                            <NavLink
                                to={`/groups/${groupId}/pending-requests`}
                                className={`${styles.actionBtn} ${numberOfRequests === 0 ? styles.emptyRequestsBtn : ''}`}
                            >
                                <span>Demandes ({numberOfRequests})</span>
                                <svg
                                    className={styles.arrowIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </NavLink>
                        )}
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