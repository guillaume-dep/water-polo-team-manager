import Events from "../models/event.model.js";
import Groups from "../models/group.model.js";
import AppError from "./AppError.js";

/* Should use OOP and create an Object FindInCollectionById(collection, objectId) */

export const findGroupById = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (!group) throw new AppError("Group not found", 404);
    return group;
};

export const findEventById = async (eventId) => {
    const event = await Events.findById(eventId);
    if (!event) throw new AppError("Event not found", 404);
    return event;
};