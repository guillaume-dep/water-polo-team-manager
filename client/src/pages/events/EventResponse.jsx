import Responses from "../responses/Responses"
import { useEventResponse } from "../../hooks/useEventResponse"

const EventResponse = ({ event }) => {
    const {
        currentStatus,
        isSubmitting,
        isLoading,
        handleResponseChange
    } = useEventResponse(event)

    return (
        <Responses
            currentStatus={currentStatus}
            onResponseChange={handleResponseChange}
            disabled={isSubmitting || isLoading}
        />
    )
}

export default EventResponse