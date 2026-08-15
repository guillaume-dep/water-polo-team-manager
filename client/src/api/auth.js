import api from "./axios.js";

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};