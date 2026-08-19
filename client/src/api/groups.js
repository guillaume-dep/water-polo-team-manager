import api from "./axios";

/* POST call to create a new group */
export const createGroup = async (name) => {
    const res = await api.post("/groups", {
        name
    });
    return res.data;
};

/* POST call to join a group using its code */
export const joinGroup = async (code) => {
    const res = await api.post("/groups/join", {
        code
    });
    return res.data;
};

/* POST call to accept a player */
export const acceptJoinRequest = async (groupId, userId) => {
    const res = await api.post(
        `/groups/${groupId}/join-requests/${userId}`
    )

    return res.data
}

/* POST call to reject a player */
export const rejectJoinRequest = async (groupId, userId) => {
    const res = await api.delete(
        `/groups/${groupId}/join-requests/${userId}`
    )

    return res.data
}

/* GET call to visualize the players who requested to join */
export const getJoinRequests = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/join-requests`)
    return res.data
}

/* GET call to search for a group by its code */
export const searchGroupByCode = async (code) => {
    const res = await api.get("/groups/", {
        params: { code } /* req.query (backend) */
    })
    return res.data
}

/* GET call to get the groups of the currently authenticated user */
export const getMyGroups = async () => {
    const res = await api.get("/groups/me");
    return res.data;
};

/* GET call to get a group by its ID */
export const getGroup = async (groupId) => {
    const res = await api.get(`/groups/${groupId}`);
    return res.data;
};

/* DELETE call to leave a group */
export const leaveGroup = async (groupId) => {
    const res = await api.delete(`/groups/${groupId}/members/me`);
    return res.data;
};

/* DELETE call to delete a group */
export const deleteGroup = async (groupId) => {
    const res = await api.delete(`/groups/${groupId}`);
    return res.data;
};

