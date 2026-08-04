import mongoose from "mongoose";

const dbURI = 'mongodb://127.0.0.1:27017/wp-team-managerBase'
const dbConnection = mongoose.createConnection(dbURI)

dbConnection.on('connected', () => console.log(`connected to ${dbURI}`))
dbConnection.on('disconnected', () => console.log(`disconnected from ${dbURI}`))
dbConnection.on('error', () => console.log(`error`))

export default dbConnection