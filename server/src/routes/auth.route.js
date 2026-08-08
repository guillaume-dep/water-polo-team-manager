import express from 'express'
import {register, login, logout, /*deleteAccount*/ } from '../controllers/auth.controller.js';
import validToken from '../middlewares/validToken.middleware.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', validToken, logout)
/* router.delete('/delete', deleteAccount) */

export default router;