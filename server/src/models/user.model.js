import mongoose from "mongoose";
import dbConnection from "../config/database.js";
import ROLE from "../../../shared/utils/role.js";

/**
 * A user can either be a coach or a player
 */
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, minlength: 2, maxlength: 30},
    email: {type: String, required: true, unique: true, trim: true, maxlength: 30},
    passwordHash: {type: String, required: true},
    role: {type: String, enum: Object.values(ROLE), required: true} // list required for enum
}, {timestamps: true});

const Users = dbConnection.model('User', userSchema)

export default Users