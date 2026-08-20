import Responses from "../responses/Responses"
import { useEventResponse } from "../../hooks/useEventResponse"

const EventResponse = ({ event, updateResponsesMap }) => {
    const {
        currentStatus,
        isSubmitting,
        isLoading,
        handleResponseChange
    } = useEventResponse(event, updateResponsesMap)

    return (
        <Responses
            currentStatus={currentStatus}
            onResponseChange={handleResponseChange}
            disabled={isSubmitting || isLoading}
        />
    )
}

export default EventResponse