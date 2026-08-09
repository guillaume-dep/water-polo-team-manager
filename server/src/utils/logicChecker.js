import AppError from "./AppError.js"
import EVENT_TYPE from "../../../shared/utils/eventType.js"
import ROLE from "../../../shared/utils/role.js"

/* ----- ROLE ----- */

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

/* ----- EVENT ----- */

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

/* ----- USER ----- */
import RESPONSE_TYPE from "../../../shared/utils/responseType.js"

export const checkUserData = (name, email, password, role) => {
    checkUserName(name)
    checkUserEmail(email)
    checkUserPassword(password)
    checkUserRole(role)
}

export const checkUserName = (name) => {
    if (!name || !name.trim()) throw new AppError("Name is required", 400)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AppError("Invalid email format", 400)
}

export const checkUserEmail = (name) => {
    if (!email || !email.trim()) throw new AppError("Email is required", 400)
}

export const checkUserPassword = (password) => {
    if (!password) throw new AppError("Password is required", 400)
    if (password.length < 8) throw new AppError("Password must be at least 8 characters", 400)
}

export const checkUserRole = (role) => {
    if (!role || !Object.values(ROLE).includes(role)) throw new AppError("Invalid role", 400)
}

/* ----- RESPONSE ----- */

export const checkResponseData = (status) => {
    if (!status) throw new AppError("Status is required", 400)
    if (!Object.values(RESPONSE_TYPE).includes(status)) throw new AppError("Invalid status", 400)
}