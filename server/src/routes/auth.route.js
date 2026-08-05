import express from 'express'
import {register, login, logout, /*deleteAccount*/ } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
/* router.delete('/delete', deleteAccount) */

export default router;