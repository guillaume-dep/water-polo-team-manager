import api from "./axios.js";

/* POST call to create an event in a group */
export const createEvent = async (groupId, name, date, location, eventType) => {
    const res = await api.post(`/groups/${groupId}/events`, {
        name,
        date,
        location,
        eventType
    });
    return res.data;
};

/* GET call to get all events from a group */
export const getEventsFromGroup = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/events`);
    return res.data;
};

/* GET call to get a specific event from a group */
export const getEvent = async (groupId, eventId) => {
    const res = await api.get(`/groups/${groupId}/events/${eventId}`);
    return res.data;
};

/* PUT call to update an event */
export const updateEvent = async (
    groupId,
    eventId,
    name,
    date,
    location,
    eventType
) => {
    const res = await api.put(`/groups/${groupId}/events/${eventId}`, {
        name,
        date,
        location,
        eventType
    });
    return res.data;
};

/* DELETE call to delete an event */
export const deleteEvent = async (groupId, eventId) => {
    const res = await api.delete(`/groups/${groupId}/events/${eventId}`);
    return res.data;
};