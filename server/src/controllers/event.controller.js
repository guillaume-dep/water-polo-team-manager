import Events from "../models/event.model.js"
import { findEventById, findGroupById } from "../utils/dbFinder.js";
import { checkIsCoach, checkIsMemberOrCoach, checkEventInGroup, checkEventData } from "../utils/logicChecker.js"

export const createEvent = async (req, res) => {
    try {
        const { name, date, location, eventType } = req.body
        checkEventData(name, date, location, eventType)

        const group = await findGroupById(req.params.id)

        /* Checks if it's the coach of the group */
        checkIsCoach(group, req.user.id)

        const createdBy = req.user.id
        const event = await Events.create({
            name,
            date,
            location,
            group,
            createdBy,
            eventType
        })

        res.status(201).json(event)
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const getEventsFromGroup = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsMemberOrCoach(group, req.user.id)
        const events = await Events.find({ group: group._id }).populate('group', 'name')
        res.json(events)
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const getEvent = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsMemberOrCoach(group, req.user.id)
        let event = await findEventById(req.params.eventId)
        checkEventInGroup(group, event)
        event = event.populate('group', 'name')

        res.json(event)
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const event = await findEventById(req.params.eventId)
        const group = await findGroupById(req.params.id)

        checkIsCoach(group, req.user.id)
        checkEventInGroup(group, event)

        const { name, date, location, eventType } = req.body

        const newName = name ?? event.name
        const newDate = date ?? event.date
        const newLocation = location ?? event.location
        const newEventType = eventType ?? event.eventType

        checkEventData(
            newName,
            newDate,
            newLocation,
            newEventType
        )

        event.name = newName
        event.date = newDate
        event.location = newLocation
        event.eventType = newEventType

        await event.save()
        res.json(event)
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsCoach(group, req.user.id)

        const event = await findEventById(req.params.eventId)
        checkEventInGroup(group, event)

        await Events.findByIdAndDelete(event._id)
        res.json({ message: "Event deleted" })
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

