import AppError from "./AppError.js"

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

