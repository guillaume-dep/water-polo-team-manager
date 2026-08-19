import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonCard from '../../components/PersonCard.jsx'
import { getResponses } from '../../api/responses.js'

import styles from '../../styles/events/eventResponses.module.css'

const EventResponses = () => {
    const { eventId } = useParams()

    const [responses, setResponses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const data = await getResponses(eventId)
                setResponses(data)
            } catch (error) {
                console.error("Error occured while retrieving responses", error)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchResponses()
    }, [eventId])

    if (isLoading) {
        return <p>Chargement des réponses...</p>
    }

    if (responses.length === 0) {
        return <p>Aucune réponse pour le moment.</p>
    }

    return (
        <main className={styles.container}>
            <h1>Réponses</h1>

            <div className={styles.responsesList}>
                {responses.map((response) => (
                    <PersonCard
                        key={response.user._id}
                        person={response.user}
                        showResponses={true}
                    >
                        {response.status === 'accepted' ? (
                            <span
                                className={styles.accepted}
                                title="Présent"
                            >
                                ✓
                            </span>
                        ) : (
                            <span
                                className={styles.rejected}
                                title="Absent"
                            >
                                ✕
                            </span>
                        )}
                    </PersonCard>
                ))}
            </div>
        </main>
    )
}

export default EventResponses