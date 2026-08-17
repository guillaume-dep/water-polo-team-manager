import { useState, useEffect } from 'react'
import { getMyGroups } from '../api/groups.js'
import { getEventsFromGroup } from '../api/events.js'

export const useEvents = (limit = null) => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true)
                const groups = await getMyGroups()
                const eventsPromises = groups.map((group) =>
                    getEventsFromGroup(group._id || group.id)
                )
                const eventsArrays = await Promise.all(eventsPromises)

                const now = new Date()
                let allEvents = eventsArrays
                    .flat()
                    .filter((event) => new Date(event.date) >= now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))

                if (limit) {
                    allEvents = allEvents.slice(0, limit)
                }

                setEvents(allEvents)
            } catch (error) {
                console.error("Erreur lors de la récupération des événements :", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEvents()
    }, [limit])

    return { events, isLoading }
}