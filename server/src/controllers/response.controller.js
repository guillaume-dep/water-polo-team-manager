import Responses from "../models/response.model.js"
import { findEventById, findGroupById } from "../utils/dbFinder.js"
import { checkIsMember, checkIsMemberOrCoach } from "../utils/logicChecker.js"

export const createResponse = async(req, res) => {
    try{
        
        const group = await findGroupById(req.params.id)
        checkIsMember(group, req.user.id)

        const event = await findEventById(req.params.eventId)
        const status = req.body.status
        const comment = req.body.comment
        const response = await Responses.create({
            status,
            user: req.user.id,
            event,
            comment
        })

        res.status(201).json(response)

    }

    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const updateResponse = async(req, res) => {
    try{
        
    }

    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}

export const getResponses = async(req, res) => {
    try{
        const group = await findGroupById(req.params.id)
        checkIsMemberOrCoach(group, req.user.id)

        const event = await findEventById(req.params.eventId)
        const responses = await Responses.find({event: req.params.eventId})

        res.json(responses)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}