import AppError from "./AppError.js"

export const checkIsInGroup = (group, userId) => {
    if (!group.members.includes(userId)) {
        throw new AppError("Not your group", 403);
    }
};

export const checkIsCoach = (group, userId) => {
    if (group.coach.toString() !== userId) {
        throw new AppError("You are not a coach", 403)
    }
}