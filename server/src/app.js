import express from 'express'
import dbConnection from './config/database.js'
import router from './routes/auth.route.js'

const app = express()
app.use('/', router)

export default app