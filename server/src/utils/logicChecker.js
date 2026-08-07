export const checkIsCoach = (group, userId) => {
    if (group.coach.toString() !== userId) {
        throw new Error("Not your group")
    }
}