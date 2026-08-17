import { formatEventDate } from '../utils/date.js'
import styles from '../styles/home/home.module.css'

export const EventCard = ({ event }) => {
    const formattedDate = formatEventDate(event.date)

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventDate}>
                <span className={styles.dayName}>{formattedDate.dayName}</span>
                <span className={styles.dayNumber}>{formattedDate.dayNumber}</span>
                <span className={styles.month}>{formattedDate.month}</span>
            </div>
            <div className={styles.eventDetails}>
                <h3>{event.name}</h3>
                <p>{formattedDate.time} • {event.location}</p>
            </div>
        </div>
    )
}