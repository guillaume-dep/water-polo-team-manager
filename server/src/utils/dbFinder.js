import Events from "../models/event.model.js";
import Groups from "../models/group.model.js";

/* Should use OOP and create an Object FindInCollectionById(collection, objectId) */

export const findGroupById = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (!group) throw new Error("Group not found");
    return group;
};

export const findEventById = async (eventId) => {
    const event = await Events.findById(eventId);
    if (!event) throw new Error("Event not found");
    return event;
};