import mongoose from "mongoose";
import "dotenv/config";

const dbURI = process.env.MONGO_URI
const dbConnection = mongoose.createConnection(dbURI)

dbConnection.on('connected', () => console.log(`connected to ${dbURI}`))
dbConnection.on('disconnected', () => console.log(`disconnected from ${dbURI}`))
dbConnection.on('error', () => console.log(`error`))

export default dbConnection