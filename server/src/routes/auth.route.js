import express from 'express'
import {register, login, logout, /*deleteAccount*/ } from '../controllers/auth.controller.js';
import validToken from '../middlewares/validToken.middleware.js';

const router = express.Router()

/* TODO : coach role should be verified by an admin */
router.post('/register', register)

/* TODO : rate limiting to prevent DDOS */
router.post('/login', login)

router.post('/logout', validToken, logout)
/* router.delete('/delete', deleteAccount) */

export default router;