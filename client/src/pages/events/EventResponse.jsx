import { useEventResponse } from "../../hooks/useEventResponse"

import Responses from "../responses/Responses.jsx"

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