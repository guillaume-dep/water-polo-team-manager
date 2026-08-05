import express from 'express'
import validToken from '../middlewares/validToken.middleware.js'
import requireRole from '../middlewares/requireRole.middleware.js'
import ROLE from '../../../shared/utils/role.js'
import { createEvent, getEventsFromGroup, getEventDetails, updateEvent, deleteEvent } from '../controllers/event.controller.js'
const router = express.Router({ mergeParams: true }) /* To retrieve the id of the group*/

router.post('/events', validToken, requireRole(ROLE.COACH), createEvent)
router.get('/events', validToken, getEventsFromGroup)
router.get('/events/:eventId', validToken, getEventDetails)
router.put('/events/:eventId', validToken, requireRole(ROLE.COACH), updateEvent)
router.delete('/events/:eventId', validToken, requireRole(ROLE.COACH), deleteEvent)

export default router