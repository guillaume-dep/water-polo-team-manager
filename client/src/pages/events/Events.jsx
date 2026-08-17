import { useEvents } from "../../hooks/useEvents.js"
import { formatEventDate } from "../../utils/date.js"


const Events = () => {
    const { events, isLoading } = useEvents()
    return (
        <div>Events</div>
    )
}

export default Events