import api from "./axios.js";

/* POST call to register a user */
export const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role
    })
    return res.data
}

/* POST call to log in a user */
export const login = async (email, password) => {
    const res = await api.post('/auth/login', {
        email,
        password
    })
    return res.data
}

/* POST call to log out a user */
export const logout = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};

/* GET call to get the currently authenticated user's data */
export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};

/* PUT call to update the currently authenticated user's data */
export const updateUserData = async (data) => {
    const res = await api.put("/auth/me", data);
    return res.data;
};

/* PUT call to update the currently authenticated user's password */
export const updatePassword = async (passwordData) => {
    const res = await api.put("/auth/me/password", passwordData);
    return res.data;
};

/* DELETE call to delete the currently authenticated user's account */
export const deleteAccount = async () => {
    const res = await api.delete("/auth/me");
    return res.data;
};