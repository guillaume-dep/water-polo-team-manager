import Groups from "../models/group.model.js"
import crypto from "crypto";
import ROLE from "../../../shared/utils/role.js";
import { findGroupById } from "../utils/dbFinder.js";
import { checkIsMember, checkIsCoach, checkIsMemberOrCoach } from "../utils/logicChecker.js";
import AppError from "../utils/AppError.js"

export const searchGroupByCode = async (req, res) => {
    try {
        const { code } = req.query
        if (!code) throw new AppError("Missing code", 400)

        const group = await Groups.findOne({ code });
        if (!group) throw new AppError("Group not found", 404)

        res.json({
            name: group.name,
            code: group.code
        })
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const createGroup = async (req, res) => {
    try {
        const { name } = req.body
        if (!name || !name.trim()) throw new AppError("Name is required", 400)

        /* code = 6 hex caracteres */
        const code = crypto.randomBytes(3).toString("hex")
        const group = await Groups.create({
            name,
            code,
            coach: req.user.id,
            members: []
        })

        res.status(201).json(group)
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const joinGroup = async (req, res) => {
    try {
        const { code } = req.body
        if (!code) throw new AppError("Code is required", 400)

        const group = await Groups.findOne({ code })
        if (!group) throw new AppError("Group not found", 404)

        /* func alreadyInGroup, invert of checkIsMember */
        if (group.members.includes(req.user.id)) {
            throw new AppError("Already in the group", 409)
        }

        group.members.push(req.user.id)
        await group.save(); /* Mongoose sends a request to the DB */

        res.json({
            name: group.name,
            code: group.code
        })
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const getGroup = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsMemberOrCoach(group, req.user.id)

        /* Same object as group but with real documents instead of ids*/
        const populated = await group.populate([
            { path: 'coach', select: 'name' },
            { path: 'members', select: 'name' }
        ])

        const isCoach = group.coach._id.toString() === req.user.id
        const response = {
            name: populated.name,
            coach: populated.coach,
            members: populated.members,
        }

        /* Share the code if it's the coach of the group */
        if (isCoach) response.code = populated.code

        res.json(response)
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const getMyGroups = async (req, res) => {
    try {

        const isCoach = req.user.role === ROLE.COACH

        const filter = (isCoach)
            ? { coach: req.user.id }
            : { members: req.user.id } /* MongoDB checks if the "members" array contains it */

        const groups = await Groups.find(filter).populate('coach', 'name')
        res.json(groups)
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsMember(group, req.user.id)

        group.members.pull(req.user.id)
        await group.save()
        res.json({
            name: group.name,
            code: group.code
        })
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const group = await findGroupById(req.params.id)
        checkIsCoach(group, req.user.id)

        await Groups.findByIdAndDelete(req.params.id);

        res.json({ message: "Group deleted" });
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}