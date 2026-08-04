import express from 'express'
const router = express.Router()
import json from '../controllers/auth.controller.js';

router.get('/', json)

export default router;