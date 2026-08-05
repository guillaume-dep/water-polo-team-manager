import express from 'express'
import validToken from '../middlewares/validToken.middleware.js'
import requireRole from '../middlewares/requireRole.middleware.js'
import ROLE from '../../../shared/utils/role.js'
import {searchGroupByCode, createGroup, joinGroup, getMyGroups, leaveGroup, deleteGroup} from '../controllers/group.controller.js'

const router = express.Router()

router.get('/', validToken, searchGroupByCode)
/* Identifies a user instead of filtering in the controller */
router.get('/me', validToken, getMyGroups)

router.post('/', validToken, requireRole(ROLE.COACH), createGroup)
router.delete('/:id', validToken, requireRole(ROLE.COACH), deleteGroup)

router.post('/:id/members', validToken, requireRole(ROLE.PLAYER), joinGroup)
/* Delete myself from the list "members" of the group ":id" */
router.delete('/:id/members/me', validToken, requireRole(ROLE.PLAYER), leaveGroup)

export default router