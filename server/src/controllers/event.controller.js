import Events from "../models/event.model.js"

export const createEvent = async(req, res) => {
    try{
        const {name, date, location, eventType} = req.body
        const group = await Groups.findById(req.params.id)
        if (!group) return res.status(404).json({ message: "Group not found" })
        
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
    
}

export const getEventDetails = async(req, res) => {

}

export const updateEvent = async(req, res) => {

}

export const deleteEvent = async(req, res) => {

}
