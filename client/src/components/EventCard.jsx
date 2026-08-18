import { formatEventDate } from '../utils/date.js'
import Responses from '../pages/responses/Responses.jsx'
import { useEventResponse } from '../hooks/useEventResponse.js'
import { useAuth } from '../context/hooks/useAuth.js' // Import de ton hook d'authentification
import ROLE from '../../../shared/utils/role.js' // Import de tes constantes de rôles

import styles from '../styles/events/eventCard.module.css'

export const EventCard = ({ event }) => {
    const { user } = useAuth()
    const { currentStatus, currentComment, isSubmitting, isLoading, handleResponseChange } = useEventResponse(event)
    const formattedDate = formatEventDate(event.date)

    // Libellé propre
    const eventTypeLabel = event.eventType === 'training'
        ? 'Entraînement'
        : event.eventType === 'match'
            ? 'Match'
            : event.eventType

    const titleContainsType = event.name && eventTypeLabel &&
        event.name.toLowerCase().includes(eventTypeLabel.toLowerCase())

    const isCoach = user?.role === ROLE.COACH

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

                    {eventTypeLabel && !titleContainsType && (
                        <span className={styles.eventTypeTag}>
                            {eventTypeLabel}
                        </span>
                    )}
                </div>

                <p>
                    {formattedDate.time} • {event.location}
                </p>

                {/* Masqué si l'utilisateur est un coach */}
                {!isCoach && (
                    <Responses
                        currentStatus={currentStatus}
                        currentComment={currentComment}
                        onResponseChange={handleResponseChange}
                        disabled={isSubmitting || isLoading}
                    />
                )}
            </div>
        </div>
    )
}