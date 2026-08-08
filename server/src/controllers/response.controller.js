import AppError from "../utils/AppError.js"
import Responses from "../models/response.model.js"
import { findEventById, findGroupById } from "../utils/dbFinder.js"
import { checkIsMember, checkIsMemberOrCoach, checkEventInGroup } from "../utils/logicChecker.js"

export const createResponse = async(req, res) => {
    try{
        
        const group = await findGroupById(req.params.id)
        checkIsMember(group, req.user.id)

        const event = await findEventById(req.params.eventId)
        checkEventInGroup(group, event)

        /* There's also an unique index in the schema */
        const existing = await Responses.findOne({ event: req.params.eventId, user: req.user.id })
        if (existing) throw new AppError("Response already exists", 409)

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
        const group = await findGroupById(req.params.id)
        checkIsMember(group, req.user.id)
        const event = await findEventById(req.params.eventId)
        checkEventInGroup(group, event)

        const response = await Responses.findOne({ event: req.params.eventId, user: req.user.id })
        if (!response) throw new AppError("Response not found", 404)

        const {status, comment} = req.body
        response.status = status ?? response.status
        response.comment = comment ?? response.comment

        await response.save()
        res.json(response)
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
        checkEventInGroup(group, event)

        const responses = await Responses.find({event: req.params.eventId})

        res.json(responses)
    }
    catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
}