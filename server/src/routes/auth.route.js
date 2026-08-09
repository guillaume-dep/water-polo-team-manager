import express from 'express'
import {register, login, logout, getUserData, updateUserData, updatePassword, deleteAccount } from '../controllers/auth.controller.js';
import validToken from '../middlewares/validToken.middleware.js';

const router = express.Router()

/* TODO : coach role should be verified by an admin */
router.post('/register', register)
router.post('/login', login)
router.post('/logout', validToken, logout)

router.get('/me', validToken, getUserData)
router.get('/me', validToken, updateUserData)
router.put('/me/password', validToken, updatePassword)
router.delete('/me', deleteAccount)

export default router;