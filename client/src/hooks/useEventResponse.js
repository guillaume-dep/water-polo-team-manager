import { useEffect, useState } from 'react'
import { createResponse, updateResponse, getMyResponse } from '../api/responses.js'

export const useEventResponse = (event, updateResponsesMap) => {
    const groupId = event?.group._id
    const eventId = event?._id

    const [currentStatus, setCurrentStatus] = useState(null)
    const [currentComment, setCurrentComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {

        /* change the UI state before the DB */
        const fetchMyResponse = async () => {
            if (!groupId || !eventId) {
                setIsLoading(false)
                return
            }

            try {
                const response = await getMyResponse(groupId, eventId)
                setCurrentStatus(response?.status ?? null)
                setCurrentComment(response?.comment ?? "")
            } catch (err) {
                console.error('Error occured while retrieving the reponse', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMyResponse()
    }, [groupId, eventId])

    const handleResponseChange = async (newStatus, newComment) => {
        if (isSubmitting || !groupId || !eventId) return

        const previousStatus = currentStatus
        const previousComment = currentComment
        setCurrentStatus(newStatus)
        setCurrentComment(newComment)
        setIsSubmitting(true)

        try {
            if (currentStatus) {
                await updateResponse(groupId, eventId, newStatus, newComment)
            } else {
                await createResponse(groupId, eventId, newStatus, newComment)
            }
            updateResponsesMap?.(eventId, newStatus)

        } catch (err) {
            console.error("Error occured while saving response", err)
            setCurrentStatus(previousStatus)
            setCurrentComment(previousComment)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        currentStatus,
        currentComment,
        isLoading,
        isSubmitting,
        handleResponseChange
    }
}