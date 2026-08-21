import mongoose from "mongoose";
import dbConnection from "../config/database.js";

import RESPONSE_TYPE from "../../../shared/utils/responseType.js";

const responseSchema = new mongoose.Schema({
    status: { type: String, enum: Object.values(RESPONSE_TYPE), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    comment: { type: String, trim: true, maxlength: 100 },
}, { timestamps: true })

responseSchema.index(
    { event: 1, user: 1 },
    { unique: true } // One response per user and event. 
);

const Responses = dbConnection.model('Response', responseSchema)

export default Responses