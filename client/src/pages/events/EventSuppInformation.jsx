import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEvent, addEventInformation } from '../../api/events.js'
import { useAuth } from '../../context/hooks/useAuth.js'
import ROLE from '../../../../shared/utils/role.js'

const EventSuppInformation = () => {
    const { id: groupId, eventId } = useParams()
    const { user } = useAuth()


}

export default EventSuppInformation