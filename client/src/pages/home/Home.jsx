import { useState, useEffect } from "react"
import { useAuth } from "../../context/hooks/useAuth.js"
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom'

import { getMyGroups } from "../../api/groups.js"
import { getEventsFromGroup } from "../../api/events.js"

import ROLE from "../../../../shared/utils/role.js"
import styles from "../../styles/home/home.module.css"

// --- Utilitaire pour formater la date comme sur la maquette ---
const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    return {
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase(),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase().replace('.', ''),
        time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
    }
}

const Home = () => {
    const { user } = useAuth()

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const fetchDashboardData = async () => {
            try {
                setIsLoading(true)

                const groups = await getMyGroups()

                const eventsPromises = groups.map((group) =>
                    getEventsFromGroup(group._id || group.id)
                )

                const eventsArrays = await Promise.all(eventsPromises)

                const now = new Date()

                const allEvents = eventsArrays
                    .flat()
                    .filter(event => new Date(event.date) >= now) // Filtre les événements passés
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 2)


                setEvents(allEvents)
            } catch (error) {
                console.error(
                    "Erreur lors du chargement du tableau de bord :",
                    error
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [user])



    return (
        <div className={styles.home}>
            {/* Conteneur principal sous la bannière avec coins arrondis */}
            <main className={styles.mainContent}>
                {/* Section Événements */}
                <section className={styles.eventsSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>ÉVÉNEMENTS</h2>
                    </div>

                    <div className={styles.eventsList}>
                        {isLoading ? (
                            <p className={styles.loadingText}>Chargement de vos événements...</p>
                        ) : events.length === 0 ? (
                            <p className={styles.emptyText}>Aucun événement prévu pour le moment.</p>
                        ) : (
                            events.map((event) => {
                                const formattedDate = formatEventDate(event.date)

                                return (
                                    <div key={event._id || event.id} className={styles.eventCard}>
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
                            })
                        )}
                    </div>

                    {(
                        <button className={styles.seeAllBtn}>

                        </button>
                    )}

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
        </div>
    )
}

export default Home

