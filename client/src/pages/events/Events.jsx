import { useState, useEffect } from 'react'
import { useEvents } from '../../hooks/useEvents.js'
import { getMyResponse } from '../../api/responses.js'
import { useAuth } from '../../context/hooks/useAuth.js'

import EventCard from '../../components/EventCard.jsx'
import ROLE from '../../../../shared/utils/role.js'
import FILTERS from '../../utils/filters.js'

import styles from '../../styles/events/events.module.css'

const Events = () => {
    const { user } = useAuth()
    const { events, isLoading, removeEvent } = useEvents()
    const [activeFilter, setActiveFilter] = useState(FILTERS.RECENT)
    const [responsesMap, setResponsesMap] = useState({})
    const [loadingResponses, setLoadingResponses] = useState(false)

    const isCoach = user.role === ROLE.COACH

    const updateResponsesMap = (eventId, status) => {
        setResponsesMap((prev) => ({
            ...prev,
            [eventId]: status
        }))
    }

    useEffect(() => {
        const fetchMyResponses = async () => {

            if (events.length === 0) return
            setLoadingResponses(true)

            const map = {}
            await Promise.all(
                events.map(async (event) => {
                    try {
                        const data = await getMyResponse(event.group._id, event._id)
                        map[event._id] = data ? data.status : null
                    }
                    catch (err) {
                        console.error(
                            `Erreur lors de la récupération de la réponse pour ${event._id}`,
                            err
                        )
                    }
                })
            )
            setResponsesMap(map)
            setLoadingResponses(false)
        }
        fetchMyResponses()
    }, [events])

    const getFilteredEvents = () => {
        if (activeFilter === FILTERS.UNANSWERED) {
            return events.filter((event) => responsesMap[event._id] === null)
        }

        /* copy of the array */
        const sorted = [...events].sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return activeFilter === FILTERS.OLDEST
                ? dateB - dateA
                : dateA - dateB
        })

        return sorted
    }

    const filteredEvents = getFilteredEvents()
    const isDataLoading = isLoading || loadingResponses

    const emptyMessage = activeFilter === FILTERS.UNANSWERED
        ? 'Tu as répondu à tous les événements !'
        : 'Aucun événement prévu pour le moment.'

    return (
        <main className={styles.page}>
            <div className={styles.headerContainer}>
                <h1 className={styles.title}>Tous les événements</h1>

                <div className={styles.filterGroup}>
                    <button
                        type="button"
                        className={`${styles.filterButton} ${activeFilter === FILTERS.RECENT ? styles.filterActive : ''}`}
                        onClick={() => setActiveFilter(FILTERS.RECENT)}
                    >
                        À venir
                    </button>

                    <button
                        type="button"
                        className={`${styles.filterButton} ${activeFilter === FILTERS.OLDEST ? styles.filterActive : ''}`}
                        onClick={() => setActiveFilter(FILTERS.OLDEST)}
                    >
                        Ancien
                    </button>

                    {!isCoach && (<button
                        type="button"
                        className={`${styles.filterButton} ${activeFilter === FILTERS.UNANSWERED ? styles.filterActive : ''}`}
                        onClick={() => setActiveFilter(FILTERS.UNANSWERED)}
                    >
                        Non répondu
                    </button>)}
                </div>
            </div>

            <div className={styles.eventsList}>
                {isDataLoading ? (
                    <p className={styles.loadingText}>Chargement de tes événements...</p>
                ) : filteredEvents.length === 0 ? (
                    <p className={styles.emptyText}>{emptyMessage}</p>
                ) : (
                    filteredEvents.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                            onDelete={removeEvent}
                            updateResponsesMap={updateResponsesMap}
                        />
                    ))
                )}
            </div>
        </main >
    )
}

export default Events