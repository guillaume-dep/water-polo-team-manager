import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/hooks/useAuth.js'
import { deleteEvent } from '../api/events.js'
import { formatEventDate } from '../utils/date.js'

import EventResponse from '../pages/events/EventResponse.jsx'
import ROLE from '../../../shared/utils/role.js'
import EVENT_TYPE from '../../../shared/utils/eventType.js'

import styles from '../styles/events/eventCard.module.css'

export const EventCard = ({ event, onDelete }) => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const isCoach = user?.role === ROLE.COACH
    const formattedDate = formatEventDate(event.date)

    const eventTypeLabel = event.eventType === EVENT_TYPE.TRAINING
        ? 'Entraînement'
        : event.eventType === EVENT_TYPE.MATCH
            ? 'Match'
            : event.eventType

    const titleContainsType = event.name && eventTypeLabel &&
        event.name.toLowerCase().includes(eventTypeLabel.toLowerCase())

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteEvent(event.group._id, event._id)
            onDelete(event._id)
            setShowDeleteConfirm(false)
        } catch (err) {
            console.error("Error occured while deleting an event", err)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventDate}>
                <span className={styles.dayName}>{formattedDate.dayName}</span>
                <span className={styles.dayNumber}>{formattedDate.dayNumber}</span>
                <span className={styles.month}>{formattedDate.month}</span>
                <span className={styles.year}>{formattedDate.year}</span>
            </div>

            <div className={styles.eventDetails}>
                <div className={styles.eventHeaderInfo}>
                    <div className={styles.titleAndTag}>
                        <h3>{event.name}</h3>
                        <span className={styles.eventTypeTag}>
                            {event.group?.name}
                        </span>
                    </div>
                </div>

                <p>{!titleContainsType && `${eventTypeLabel} •`} {formattedDate.time}</p>
                <p>{event.location}</p>

                {!isCoach && <EventResponse event={event} />}
            </div>

            <div className={styles.actionsDivider} />

            <div className={styles.actionsContainer}>
                <button
                    type="button"
                    onClick={() => navigate(`/groups/${event.group._id}/events/${event._id}/responses`)}
                    className={styles.moreButton}
                    title="Voir les réponses"
                    aria-label="Voir les réponses"
                >
                    <svg
                        className={styles.arrowIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {isCoach && (
                    showDeleteConfirm ? (
                        <div className={styles.deleteConfirmGroup}>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`${styles.confirmButton} ${styles.confirmYes}`}
                                title="Valider la suppression"
                                aria-label="Valider la suppression"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className={`${styles.confirmButton} ${styles.confirmNo}`}
                                title="Annuler"
                                aria-label="Annuler"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className={styles.deleteIconButton}
                            title="Supprimer l'événement"
                            aria-label="Supprimer l'événement"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default EventCard