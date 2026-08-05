import Groups from "../models/group.model"
import crypto from "crypto";
import ROLE from "../../../shared/utils/role";

export const searchGroupByCode = async(res, req) => {
    try {
        const {code} = req.query
        if (!code) {
            return res.status(400).json({message: "Missing code"})
        }
        const group = await Groups.findOne({code});
        if (!group){
            return res.status(404).json({message: "Group not found"})
        }

        res.json(group)
    }
    catch(err){
        res.status(500).json({ message: err.message });
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

        /* Should we include the coach into the members array ? */
        res.status(201).json(group)
    }
    catch(err){
        res.status(500).json({ message: err.message });

    }
}

export const joinGroup = async(req, res) => {
    try {
        const {code} = req.body
        
        const group = await Groups.findOne({code})
        if (!group){
            return res.status(404).json({message: "Invalid code"})
        }

        if (group.members.includes(req.user.id)){
            return res.status(409).json({message: "Already in the group"})
        }
        group.members.push(req.user.id)
        await group.save(); /* Mongoose send a request to the DB */

        res.json(group)
    }
    catch(err){
        res.status(500).json({message: err.message})
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
        res.status(500).json({message: err.message})
        
    }
}

export const leaveGroup = async(req, res) => {

}

export const deleteGroup = async(req, res) => {

}