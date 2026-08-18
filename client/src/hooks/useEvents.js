import { useState, useEffect } from 'react'
import { getMyGroups } from '../api/groups.js'
import { getEventsFromGroup } from '../api/events.js'

export const useEvents = (limit = null) => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEvents = async () => {
        try {
            setIsLoading(true)

            const groups = await getMyGroups()

            const eventsPromises = groups.map((group) =>
                getEventsFromGroup(group._id)
            )

            const now = new Date()

            let events = (await Promise.all(eventsPromises))
                .flat()
                .filter((event) => new Date(event.date) >= now)
                .sort(
                    (a, b) =>
                        new Date(a.date) - new Date(b.date)
                )

            if (limit) {
                events = events.slice(0, limit)
            }

            setEvents(events)
        } catch (err) {
            console.error(
                'Error occured while retrieving events',
                err
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [limit])

    const removeEvent = async () => {
        await fetchEvents()
    }

    return { events, isLoading, removeEvent }
}