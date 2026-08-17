import { useState, useEffect } from "react"
import { useAuth } from "../../context/hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

import { getMyGroups } from "../../api/groups.js"
import { getEventsFromGroup } from "../../api/events.js"

import ROLE from "../../../../shared/utils/role.js"
import logo from "../../../images/RDM_logo.jpg"
import styles from "../../styles/home/home.module.css"

// --- Utilitaire pour formater la date comme sur la maquette ---
const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    return {
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase(),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase().replace('.', '')
    }
}

const Home = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const role = user?.role

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

                const allEvents = eventsArrays
                    .flat()
                    .sort((a, b) => new Date(a.date) - new Date(b.date))

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

    const handleAction = () => {
        if (role === ROLE.COACH) {
            navigate('/groups/create')
        }
        if (role === ROLE.PLAYER) {
            navigate('/groups/join')
        }
    }

    return (
        <div className={styles.home}>
            <header className={styles.banner}>
                <img src={logo} alt="RDM logo" className={styles.logo} />
                <h1 className={styles.bannerTitle}>RDM WATER POLO</h1>
            </header>

            {/* Section Événements */}
            <section className={styles.eventsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>ÉVÉNEMENTS</h2>
                </div>

                <div className={styles.eventsList}>
                    {isLoading ? (
                        <p>Chargement de vos événements...</p>
                    ) : events.length === 0 ? (
                        <p>Aucun événement prévu pour le moment.</p>
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
                                        <p>{event.location}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {events.length > 0 && (
                    <button className={styles.seeAllBtn}>
                        Voir tout &gt;
                    </button>
                )}
            </section>
        </div>
    )
}

export default Home