import Responses from "../responses/Responses"
import { useEventResponse } from "../../hooks/useEventResponse"

const EventResponse = ({ event }) => {
    const {
        currentStatus,
        currentComment,
        isSubmitting,
        isLoading,
        handleResponseChange
    } = useEventResponse(event)

    return (
        <Responses
            currentStatus={currentStatus}
            currentComment={currentComment}
            onResponseChange={handleResponseChange}
            disabled={isSubmitting || isLoading}
        />
    )
}

export default EventResponse