import mongoose from "mongoose";
import dbConnection from "../config/database.js";
import response from "../../../shared/utils/responseType.js";

const responseSchema = new mongoose.Schema({
    status: {type: String, enum: Object.values(response), required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    comment: {type: String}
}, {timestamps: true})

responseSchema.index(
    { event: 1, user: 1 }, 
    { unique: true } // to prevent from a user who wants to answer multiple times the same answer 
);

const Responses = dbConnection.model('Response', responseSchema)

export default Responses