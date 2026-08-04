import mongoose from "mongoose";
import dbConnection from "../config/database.js";

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

const Events = dbConnection.model('Event', eventSchema)

export default Events