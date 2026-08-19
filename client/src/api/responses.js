import api from "./axios.js";

/* POST call to create a response to an event */
export const createResponse = async (groupId, eventId, status, comment) => {
    const res = await api.post(`/groups/${groupId}/events/${eventId}/responses`, {
        status,
        comment
    })
    return res.data
}

/* PUT call to update the current user's response */
export const updateResponse = async (groupId, eventId, status, comment) => {
    const res = await api.put(
        `/groups/${groupId}/events/${eventId}/responses/me`,
        {
            status,
            comment
        }
    );

    return res.data;
};

/* GET call to get all responses from an event */
export const getResponses = async (groupId, eventId) => {
    const res = await api.get(
        `/groups/${groupId}/events/${eventId}/responses`
    );

    return res.data;
};

/* GET call to get my response to an event */
export const getMyResponse = async (groupId, eventId) => {
    const res = await api.get(
        `/groups/${groupId}/events/${eventId}/responses/me`
    );

    return res.data;
};