import mongoose from "mongoose";
import dbConnection from "../config/database.js";
import EVENT_TYPE from "../../../shared/utils/eventType.js";
import Responses from "./response.model.js";

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    eventType: {type: String, enum: Object.values(EVENT_TYPE), required: true},
}, {timestamps: true});

eventSchema.pre('findOneAndDelete', async function(next){
    try{
        const eventId = this.getQuery()._id
        await Responses.deleteMany({event: eventId})
        next()
    }

    catch(err){
        next(err)
    }
})

const Events = dbConnection.model('Event', eventSchema)

export default Events

/* TODO : CASCADE SUPPRESSION 

await Response.deleteMany({ event: req.params.eventId })
await Events.findByIdAndDelete(req.params.eventId)

*/