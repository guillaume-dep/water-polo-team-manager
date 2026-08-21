import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getJoinRequests } from '../../api/groups'

import ROLE from '../../../../shared/utils/role'

import styles from '../../styles/groups/groupCard.module.css'

const GroupCard = ({ groups, isLoading }) => {

    const { user } = useAuth()
    const isCoach = user.role === ROLE.COACH

    const [groupsWithRequests, setGroupWithRequests] = useState({})

    useEffect(() => {
        const fetchGroupWithRequests = async () => {
            if (!isCoach || groups.length === 0) return

            const requestsMap = {}

            await Promise.all(
                groups.map(async (group) => {
                    try {
                        const requests = await getJoinRequests(group._id)
                        requestsMap[group._id] = requests.length > 0
                    } catch (error) {
                        console.error("Error occured while retrieving group join requests", error)
                        requestsMap[group._id] = false
                    }
                })
            )
            setGroupWithRequests(requestsMap)
        }
        fetchGroupWithRequests()
    }, [groups, isCoach])


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
                    <NavLink
                        key={group._id}
                        to={`/groups/${group._id}/members`}
                        className={styles.groupCard}
                    >
                        {groupsWithRequests[group._id] && (
                            <span
                                className={styles.requestBadge}
                                title="Nouvelle demande pour rejoindre le groupe"
                            />
                        )}
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

                            <p>
                                Coach : {group.coach?.name}
                            </p>
                        </div>

                        <div className={styles.arrowContainer}>
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
                        </div>
                    </NavLink>
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