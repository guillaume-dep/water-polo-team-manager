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
        return <p>Aucune réponse pour le moment.</p>
    }

    const renderStatus = (status) => {
        if (status === RESPONSE_TYPE.ACCEPTED) {
            return <span className={styles.accepted} title="Présent">✓</span>
        }
        if (status === RESPONSE_TYPE.DECLINED) {
            return <span className={styles.rejected} title="Absent">✕</span>
        }
        return <span className={styles.uncertain} title="Incertain">?</span>
    }

    return (
        <main className={styles.container}>
            <h1>Réponses</h1>

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