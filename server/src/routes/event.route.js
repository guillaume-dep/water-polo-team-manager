import express from 'express'
import validToken from '../middlewares/validToken.middleware.js'
import requireRole from '../middlewares/requireRole.middleware.js'
import ROLE from '../../../shared/utils/role.js'
import { createEvent, getEventsFromGroup, getEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js'
const router = express.Router({ mergeParams: true }) /* To retrieve the id of the group*/

router.post('/', validToken, requireRole(ROLE.COACH), createEvent)
router.get('/', validToken, getEventsFromGroup)
router.get('/:eventId', validToken, getEvent)
router.put('/:eventId', validToken, requireRole(ROLE.COACH), updateEvent)
router.delete('/:eventId', validToken, requireRole(ROLE.COACH), deleteEvent)

export default router