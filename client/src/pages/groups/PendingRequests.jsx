import { useParams } from 'react-router-dom'
import { acceptJoinRequest, getJoinRequests, rejectJoinRequest } from '../../api/groups.js'
import { useEffect, useState } from 'react'
import PersonCard from '../../components/PersonCard.jsx'

import styles from '../../styles/groups/pendingRequests.module.css'

const PendingRequests = () => {
    const { id: groupId } = useParams()

    const [personRequests, setPersonRequests] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPersonRequests = async () => {
            try {
                const data = await getJoinRequests(groupId)
                setPersonRequests(data)
            } catch (err) {
                console.error(
                    'Error occured while retrieving persons requests',
                    err
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchPersonRequests()
    }, [groupId])

    const handleAcceptRequest = async (userId) => {
        if (!userId || isSubmitting) return

        try {
            setIsSubmitting(userId)
            await acceptJoinRequest(groupId, userId)
            setPersonRequests((previousPersonRequests) => previousPersonRequests.filter((person) => person._id !== userId))
        } catch (err) {
            console.error("Error occured while accepting the request", err)
        } finally {
            setIsSubmitting(null)
        }
    }

    const handleRejectRequest = async (userId) => {
        if (!userId || isSubmitting) return

        try {
            setIsSubmitting(userId)
            await rejectJoinRequest(groupId, userId)
            setPersonRequests((previousPersonRequests) => previousPersonRequests.filter((person) => person._id !== userId))
        } catch (err) {
            console.error("Error occured while rejecting the request", err)
        } finally {
            setIsSubmitting(null)
        }
    }

    if (isLoading) {
        return (
            <main className={styles.page}>
                <p className={styles.infoText}>Chargement des demandes...</p>
            </main>
        )
    }

    if (personRequests.length === 0) {
        return (
            <main className={styles.page}>
                <h1 className={styles.title}>Demandes en attente</h1>
                <p className={styles.infoText}>Aucune demande en attente.</p>
            </main>
        )
    }

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Demandes en attente</h1>

            <div className={styles.requestsList}>
                {personRequests.map((person) => (
                    <div
                        key={person._id}
                        className={styles.requestCard}
                    >
                        <div className={styles.personWrapper}>
                            <PersonCard person={person} showEmail={true} />
                        </div>

                        <div className={styles.actions}>

                            <button
                                type="button"
                                onClick={() => handleAcceptRequest(person._id)}
                                disabled={isSubmitting === person._id}
                                className={styles.acceptButton}
                                aria-label="Accepter la demande"
                                title="Accepter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleRejectRequest(person._id)}
                                disabled={isSubmitting === person._id}
                                className={styles.rejectButton}
                                aria-label="Refuser la demande"
                                title="Refuser"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default PendingRequests