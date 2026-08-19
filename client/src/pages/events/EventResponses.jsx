import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonCard from '../../components/PersonCard.jsx'
import { getResponses } from '../../api/responses.js'
import RESPONSE_TYPE from '../../../../shared/utils/responseType.js'

import styles from '../../styles/events/eventResponses.module.css'

const EventResponses = () => {
    const { id: groupId, eventId } = useParams()

    const [responses, setResponses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const data = await getResponses(groupId, eventId)
                setResponses(data)
            } catch (error) {
                console.error("Error occured while retrieving responses", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchResponses()
    }, [groupId, eventId])

    if (isLoading) {
        return <p>Chargement des réponses...</p>
    }

    if (responses.length === 0) {
        return (
            <main className={styles.container}>
                <h1 className={styles.title}>Réponses</h1>
                <div className={styles.stateContainer}>
                    <p className={styles.infoText}>Aucune réponse pour le moment.</p>
                </div>
            </main>
        )
    }

    const renderStatus = (status) => {
        if (status === RESPONSE_TYPE.PRESENT) {
            return (
                <span className={`${styles.statusIcon} ${styles.accepted}`} title="Présent" aria-label="Présent">
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
                </span>
            )
        }
        if (status === RESPONSE_TYPE.ABSENT) {
            return (
                <span className={`${styles.statusIcon} ${styles.rejected}`} title="Absent" aria-label="Absent">
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
                </span>
            )
        }
        return (
            <span className={`${styles.statusIcon} ${styles.uncertain}`} title="Incertain" aria-label="Incertain">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7.5 8a4.5 4.5 0 1 1 9 0c0 3-4.5 4.5-4.5 5.5" />
                    <circle cx="12" cy="18" r="0.5" fill="currentColor" />
                </svg>
            </span>
        )
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Réponses</h1>

            <div className={styles.responsesList}>
                {responses.map((response) => (
                    <PersonCard
                        key={response._id}
                        person={response.user}
                        showResponses={true}
                    >
                        {renderStatus(response.status)}
                    </PersonCard>
                ))}
            </div>
        </main>
    )
}

export default EventResponses