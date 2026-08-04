import express from 'express'
import dbConnection from './config/database.js'

/* --- Router --- */
import authRouter from './routes/auth.route.js'

const app = express()

/* --- Router + Middlewares --- */

app.use('/auth', authRouter)

export default app