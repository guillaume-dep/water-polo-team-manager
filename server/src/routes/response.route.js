import express from "express"
import validToken from "../middlewares/validToken.middleware.js"
import requireRole from "../middlewares/requireRole.middleware.js"
import ROLE from "../../../shared/utils/role.js"
import { createResponse, updateResponse, getResponses } from "../controllers/response.controller.js"

const router = express.Router({mergeParams: true})

router.post('/', validToken, requireRole(ROLE.PLAYER), createResponse)
/* We can retrieve the response without using responseId by using JWT token and eventId so no route /:responseId */
router.put('/me', validToken, requireRole(ROLE.PLAYER), updateResponse)
router.get('/', validToken, getResponses)

export default router