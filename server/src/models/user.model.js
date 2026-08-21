import mongoose from "mongoose";
import dbConnection from "../config/database.js";

import ROLE from "../../../shared/utils/role.js";

import Groups from "./group.model.js";
import Responses from "./response.model.js";

/**
 * A user can either be a coach or a player
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    email: { type: String, required: true, unique: true, trim: true, maxlength: 30 },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLE), required: true } // list required for enum
}, { timestamps: true });

userSchema.pre('findOneAndDelete', async function () {
    try {
        const userId = this.getQuery()._id /* this.getQuery() = req.user.id ? */
        const user = await Users.findById(userId)
        const role = user.role

        if (role === ROLE.COACH) {
            const groups = await Groups.find({ coach: userId })
            for (const group of groups) {
                await Groups.findByIdAndDelete(group._id)
            }
        }
        else {
            const responses = await Responses.deleteMany({ user: userId })

            /* Find groups where user is in and removes it */
            await Groups.updateMany(
                { $or: [{ members: userId }, { pendingMembers: userId }] },
                { $pull: { members: userId, pendingMembers: userId } }
            )
        }
    }

    catch (err) {
        throw err
    }

})

const Users = dbConnection.model('User', userSchema)

export default Users