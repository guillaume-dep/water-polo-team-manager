import { isCookie, NavLink } from 'react-router-dom'
import { useEvents } from '../../hooks/useEvents.js'
import { EventCard } from '../../components/EventCard.jsx'
import { useAuth } from '../../context/hooks/useAuth.js'
import ROLE from '../../../../shared/utils/role.js'

import styles from '../../styles/home/home.module.css'

const Home = () => {
    const { events, isLoading, removeEvent } = useEvents(2)
    const { user } = useAuth()

    const isCoach = user?.role === ROLE.COACH

    return (
        <div className={styles.home}>
            <main className={styles.mainContent}>
                <section className={styles.eventsSection}>
                    <div className={styles.eventHeader}>
                        <h2 className={styles.sectionTitle}>Événements</h2>

                        {isCoach && (
                            <NavLink
                                to="/create-event"
                                className={styles.createEventBtn}
                                aria-label="Créer un événement"
                                title="Créer un événement"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />

                                </svg>
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
                                <EventCard
                                    key={event._id || event.id}
                                    event={event}
                                    onDelete={removeEvent}
                                />
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