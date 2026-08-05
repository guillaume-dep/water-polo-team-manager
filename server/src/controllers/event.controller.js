import Events from "../models/event.model.js"
import Groups from "../models/group.model.js";

const findGroupById = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (!group) throw new Error("Group not found");
    return group;
};

const findEventById = async (eventId) => {
    const event = await Events.findById(eventId);
    if (!event) throw new Error("Event not found");
    return event;
};

const checkIsCoach = (group, userId) => {
    if (group.coach.toString() !== userId) {
        throw new Error("Not your group")
    }
}

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
        res.status(500).json({message : err.message})
    }
}

export const getEventsFromGroup = async(req, res) => {
    try{
        const group = await findGroupById(req.params.id)
        const events = await Events.find({group})

        res.json(events)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const getEvent = async(req, res) => {
    try{
        const event = await findEventById(req.params.eventId)
        res.json(event)
    }
    catch(err){
        res.status(500).json({message: err.message})
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
        res.status(500).json({message: err.message})
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
        res.status(500).json({message: err.message})
    }
}

