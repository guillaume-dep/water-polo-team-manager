import { formatEventDate } from '../utils/date.js'
import Responses from '../pages/responses/Responses.jsx'
import { useEventResponse } from '../hooks/useEventResponse.js'

import styles from '../styles/events/eventCard.module.css'

export const EventCard = ({ event }) => {
    const { currentStatus, currentComment, isSubmitting, isLoading, handleResponseChange } = useEventResponse(event)
    const formattedDate = formatEventDate(event.date)

    // Libellé propre
    const eventTypeLabel = event.eventType === 'training'
        ? 'Entraînement'
        : event.eventType === 'match'
            ? 'Match'
            : event.eventType

    // On vérifie si le nom contient déjà le type (ex: "Entraînement U15" contient "entraînement")
    const titleContainsType = event.name && eventTypeLabel &&
        event.name.toLowerCase().includes(eventTypeLabel.toLowerCase())

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventDate}>
                <span className={styles.dayName}>
                    {formattedDate.dayName}
                </span>

                <span className={styles.dayNumber}>
                    {formattedDate.dayNumber}
                </span>

                <span className={styles.month}>
                    {formattedDate.month}
                </span>

                <span className={styles.year}>
                    {formattedDate.year}
                </span>
            </div>

            <div className={styles.eventDetails}>
                <div className={styles.eventHeaderInfo}>
                    <h3>{event.name}</h3>

                    {/* Affiche le badge seulement s'il n'est pas déjà mentionné dans le titre */}
                    {eventTypeLabel && !titleContainsType && (
                        <span className={styles.eventTypeTag}>
                            {eventTypeLabel}
                        </span>
                    )}
                </div>

                <p>
                    {formattedDate.time} • {event.location}
                </p>

                <Responses
                    currentStatus={currentStatus}
                    currentComment={currentComment}
                    onResponseChange={handleResponseChange}
                    disabled={isSubmitting || isLoading}
                />
            </div>
        </div>
    )
}