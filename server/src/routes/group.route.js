import express from 'express'
import validToken from '../middlewares/validToken.middleware.js'
import requireRole from '../middlewares/requireRole.middleware.js'
import ROLE from '../../../shared/utils/role.js'
const router = express.Router()

router.post('/', validToken, requireRole(ROLE.COACH), createGroup)
router.post('/join', validToken, requireRole(ROLE.COACH), joinGroup)
router.post('/my', validToken, getMyGroups)

export default router