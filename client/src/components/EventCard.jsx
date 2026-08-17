import { formatEventDate } from '../utils/date.js'
import Responses from '../pages/responses/Responses.jsx'
import { useEventResponse } from '../hooks/useEventResponse.js'

import styles from '../styles/events/eventCard.module.css'

export const EventCard = ({ event }) => {
    // 1. Correction : Appel de la fonction du hook (avec transmission de l'id de l'événement si nécessaire)
    const { currentStatus, currentComment, isSubmitting, isLoading, handleResponseChange } = useEventResponse(event)
    const formattedDate = formatEventDate(event.date)

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
            </div>

            <div className={styles.eventDetails}>
                <h3>{event.name}</h3>

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