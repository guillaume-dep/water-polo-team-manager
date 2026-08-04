import mongoose from "mongoose";
import dbConnection from "../config/database.js";
import ROLE from "../../../shared/utils/role.js";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:ROLE, required: true}
}, {timestamps: true});

const Users = dbConnection.model('User', userSchema)

export default Users