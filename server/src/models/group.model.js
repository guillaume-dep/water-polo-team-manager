import mongoose from "mongoose";
import dbConnection from "../config/database.js";
import Events from "./event.model.js";
import Responses from "./response.model.js";

/**
 * A group is a bunch of User
 */
const groupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

/* Executed before deleting */
groupSchema.pre('findOneAndDelete', async function(next) {
    try{
        const groupId = this.getQuery()._id /* this = current request ; return the filter */

        const events = await Events.find({group: groupId})
        const eventIds = events.map(e => e._id) /* own id */
        await Responses.deleteMany({event : {$in : eventIds}}) /* delete events which are $in eventsIds */
        await Events.deleteMany({group: groupId})
        next()
    }
    catch(err){
        next(err)
    }
})

const Groups = dbConnection.model('Group', groupSchema)

export default Groups;