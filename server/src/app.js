import express from 'express'
import dbConnection from './config/database.js'
import router from './routes/test.route.js'

const app = express()
app.use('/', router)

export default app