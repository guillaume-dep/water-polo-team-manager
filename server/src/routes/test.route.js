import express from 'express'
const router = express.Router()
import json from '../controllers/test.controller.js';

router.get('/', json)

export default router;