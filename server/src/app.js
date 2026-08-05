import express from 'express'
import dbConnection from './config/database.js'

/* --- Router --- */
import authRouter from './routes/auth.route.js'
import groupRouter from './routes/group.route.js'
import eventRouter from './routes/event.route.js'

const app = express()
app.use(express.json());

/* --- Router + Middlewares --- */

app.use('/auth', authRouter)
app.use('/groups', groupRouter)
app.use('/routes', eventRouter)
export default app