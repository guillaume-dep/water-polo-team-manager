import mongoose from "mongoose";
import dbConnection from "../config/database.js";

/**
 * A group is a bunch of User
 */
const groupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

const Groups = dbConnection.model('Group', groupSchema)

export default Groups;

