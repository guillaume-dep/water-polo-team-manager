import express from 'express'
import dbConnection from './config/database.js'

/* --- Router --- */
import authRouter from './routes/auth.route.js'
import groupRouter from './routes/group.route.js'

const app = express()

/* --- Router + Middlewares --- */

app.use('/auth', authRouter)
app.use('/groups', groupRouter)
export default app