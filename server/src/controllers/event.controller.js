import Events from "../models/event.model.js"
import { findEventById, findGroupById } from "../utils/dbFinder.js";
import { checkIsCoach } from "../utils/logicChecker.js";

export const createEvent = async(req, res) => {
    try{
        const {name, date, location, eventType} = req.body
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

    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const getEventsFromGroup = async(req, res) => {
    try{
        const group = await findGroupById(req.params.id)
        const events = await Events.find({group})

        res.json(events)
    }

    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const getEvent = async(req, res) => {
    try{
        const event = await findEventById(req.params.eventId)
        res.json(event)
    }

    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const updateEvent = async(req, res) => {
    try{
        const event = await findEventById(req.params.eventId)
        const group = await findGroupById(req.params.id)

        checkIsCoach(group, req.user.id)

        const {name, date, location, eventType} = req.body

        event.name = name ?? event.name
        event.date = date ?? event.date
        event.location = location ?? event.location
        event.eventType = eventType ?? event.eventType

        await event.save()
        res.json(event)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const deleteEvent = async(req, res) => {
    try{
        const group = await findGroupById(req.params.id)
        checkIsCoach(group, req.user.id)

        await Events.findByIdAndDelete(req.params.eventId)
        res.json({message: "Event deleted"})
    }
    
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

