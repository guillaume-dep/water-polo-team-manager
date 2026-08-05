import Events from "../models/event.model.js"
import Groups from "../models/group.model.js";

const findGroupById = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (!group) throw new Error("Group not found");
    return group;
};

export const createEvent = async(req, res) => {
    try{
        const {name, date, location, eventType} = req.body
        const group = await findGroupById(req.params.id)
        
        /* Checks if it's the coach of the group */
        if (group.coach.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not your group" })
        }

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

export const getEventDetails = async(req, res) => {
    try{
        const event = await Events.findById(req.params.eventId) /* the event id */
        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }
        res.json(event)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const updateEvent = async(req, res) => {
    
}

export const deleteEvent = async(req, res) => {

}

