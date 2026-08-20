import { useEvents } from '../../hooks/useEvents.js'
import { EventCard } from '../../components/EventCard.jsx'

import styles from '../../styles/events/events.module.css'

const Events = () => {
    const { events, isLoading, removeEvent } = useEvents()

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Tous les événements</h1>

            <div className={styles.eventsList}>
                {isLoading ? (
                    <p className={styles.loadingText}>Chargement de vos événements...</p>
                ) : events.length === 0 ? (
                    <p className={styles.emptyText}>Aucun événement prévu pour le moment.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event._id || event.id}
                            event={event}
                            onDelete={removeEvent}
                        />
                    ))
                )}
            </div>
        </main>
    )
}

export default Events