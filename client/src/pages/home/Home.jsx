import { NavLink } from 'react-router-dom'
import { useEvents } from '../../hooks/useEvents.js'
import { EventCard } from '../../components/EventCard.jsx'
import { useAuth } from '../../context/hooks/useAuth.js'
import ROLE from '../../../../shared/utils/role.js'

import styles from '../../styles/home/home.module.css'

const Home = () => {
    const { events, isLoading } = useEvents(2)
    const { user } = useAuth()

    return (
        <div className={styles.home}>
            <main className={styles.mainContent}>
                <section className={styles.eventsSection}>
                    <div className={styles.eventHeader}>
                        <h2 className={styles.sectionTitle}>Événements</h2>

                        {user?.role === ROLE.COACH && (
                            <NavLink
                                to="/create-event"
                                className={styles.createEventBtn}
                                aria-label="Créer un événement"
                                title="Créer un événement"
                            >
                                +
                            </NavLink>
                        )}
                    </div>

                    <div className={styles.eventsList}>
                        {isLoading ? (
                            <p className={styles.loadingText}>Chargement de vos événements...</p>
                        ) : events.length === 0 ? (
                            <p className={styles.emptyText}>Aucun événement prévu pour le moment.</p>
                        ) : (
                            events.map((event) => (
                                <EventCard key={event._id || event.id} event={event} />
                            ))
                        )}
                    </div>

                    {events.length > 0 && (
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                `${styles.seeAllBtn} ${isActive ? styles.active : ''}`
                            }
                            aria-label="Voir tous les événements"
                        >
                            Voir tout &gt;
                        </NavLink>
                    )}
                </section>
            </main>
        </div >
    )
}

export default Home