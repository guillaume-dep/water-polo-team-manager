import AppError from "./AppError.js"
import EVENT_TYPE from "../../../shared/utils/eventType.js"

export const checkIsMember = (group, userId) => {
    if (!group.members.includes(userId)) {
        throw new AppError("Not a member of this group", 403)
    }
}

export const checkIsCoach = (group, userId) => {
    if (group.coach.toString() !== userId) {
        throw new AppError("Not a coach of this group", 403)
    }
}

export const checkIsMemberOrCoach = (group, userId) => {
    const isCoach = group.coach.toString() === userId;
    const isMember = group.members.includes(userId);

    if (!isCoach && !isMember) {
        throw new AppError("Not a coach or a member of this group", 403);
    }
}

export const checkEventInGroup = (group, event) => {
    if (event.group.toString() !== group._id.toString()) {
        throw new AppError("Event not found", 404)
    }
}

export const checkEventData = (name, date, location, eventType) => {
    if (!name || !name.trim()) throw new AppError("Name is required", 400)
    if (!date || new Date(date) <= new Date() ) throw new AppError("Date is required", 400)
    if (!location || !location.trim()) throw new AppError("Location is required", 400)
    if (!eventType) throw new AppError("Event type is required", 400)
    if (!Object.values(EVENT_TYPE).includes(eventType)) throw new AppError("Invalid event type", 400)
}