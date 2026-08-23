import express from 'express'
import dbConnection from './config/database.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { limiter, authLimiter } from './utils/limiter.js';

/* --- Router --- */
import authRouter from './routes/auth.route.js'
import groupRouter from './routes/group.route.js'
import eventRouter from './routes/event.route.js'
import responseRouter from './routes/response.route.js'

/* --- CORS --- */
const app = express()

app.set('trust proxy', 1)

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173'
]

const corsOptions = {
    origin: (origin, callback) => {
        const isAllowed = !origin || allowedOrigins.includes(origin)
        callback(null, isAllowed)
    },
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(limiter)
app.use(helmet())

/* --- Router + Middlewares --- */

app.use('/auth', authLimiter)
app.use('/auth', authRouter)
app.use('/groups', groupRouter)
app.use('/groups/:id/events', eventRouter)
app.use('/groups/:id/events/:eventId/responses', responseRouter)

export default app