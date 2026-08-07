import Groups from "../models/group.model.js"
import crypto from "crypto";
import ROLE from "../../../shared/utils/role.js";
import { findGroupById } from "../utils/dbFinder.js";

export const searchGroupByCode = async(req, res) => {
    try {
        const {code} = req.query
        if (!code) throw new AppError("Missing code", 400)

        const group = await Groups.findOne({code});
        if (!group) throw new AppError("Group not found", 404)

        res.json(group)
    }
    catch(err) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const createGroup = async(req, res) => {
    try {
        const {name} = req.body

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

    catch(err){
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const joinGroup = async(req, res) => {
    try {
        const group = await findGroupById(req.params.id)

        /* func alreadyInGroup ? */
        if (group.members.includes(req.user.id)){
            throw new AppError("Already in the group", 409) 
        }
        group.members.push(req.user.id)
        await group.save(); /* Mongoose sends a request to the DB */

        res.json(group)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const getMyGroups = async(req, res) => {
    try {

        const isCoach = req.user.role === ROLE.COACH

        const filter = (isCoach) 
        ? {coach : req.user.id} 
        : {members: req.user.id} /* MongoDB checks if the "members" array contains it */

        const groups = await Groups.find(filter)
        res.json(groups)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const leaveGroup = async(req, res) => {
    try{
        const group = await findGroupById(req.params.id)
        checkIsInGroup(group, req.user.id)

        group.members.pull(req.user.id)
        await group.save()
        res.json(group)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const deleteGroup = async(req, res) => {
    try{
        const deletedGroup = await Groups.findByIdAndDelete(req.params.id);
        if (!deletedGroup) throw new AppError("Group not found", 404)

        res.json({message: "Group deleted"});
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}