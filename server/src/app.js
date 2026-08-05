import express from 'express'
import cookieParser from 'cookie-parser';
import dbConnection from './config/database.js'

/* --- Router --- */
import authRouter from './routes/auth.route.js'
import groupRouter from './routes/group.route.js'
import eventRouter from './routes/event.route.js'

const app = express()
app.use(express.json());
app.use(cookieParser());

/* --- Router + Middlewares --- */

app.use('/auth', authRouter)
app.use('/groups', groupRouter)
app.use('/groups/:id', eventRouter)
app.get('/debug', (req, res) => {
    res.json(req.cookies);
});

export default app