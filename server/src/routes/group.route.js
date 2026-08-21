import express from 'express'
import validToken from '../middlewares/validToken.middleware.js'
import requireRole from '../middlewares/requireRole.middleware.js'
import { searchGroupByCode, createGroup, getGroup, joinGroup, getJoinRequests, acceptJoinRequest, rejectJoinRequest, getMyGroups, leaveGroup, deleteGroup } from '../controllers/group.controller.js'

import ROLE from '../../../shared/utils/role.js'

const router = express.Router()

router.get('/', validToken, searchGroupByCode)
router.post('/', validToken, requireRole(ROLE.COACH), createGroup)

/* Identifies a user instead of filtering in the controller */
router.get('/me', validToken, getMyGroups)

/* NOT REST but players join a group with a code */
router.post('/join', validToken, requireRole(ROLE.PLAYER), joinGroup)
router.get('/:id/join-requests', validToken, requireRole(ROLE.COACH), getJoinRequests)
router.post('/:id/join-requests/:userId', validToken, requireRole(ROLE.COACH), acceptJoinRequest)
router.delete('/:id/join-requests/:userId', validToken, requireRole(ROLE.COACH), rejectJoinRequest)

router.get('/:id', validToken, getGroup)
router.delete('/:id', validToken, requireRole(ROLE.COACH), deleteGroup)

/* Delete myself from the list "members" of the group ":id" */
router.delete('/:id/members/me', validToken, requireRole(ROLE.PLAYER), leaveGroup)

export default router