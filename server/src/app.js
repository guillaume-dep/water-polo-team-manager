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
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

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
app.get('/debug', (req, res) => {
    res.json(req.cookies);
});

export default app