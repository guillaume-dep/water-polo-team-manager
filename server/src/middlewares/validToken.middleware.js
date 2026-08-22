import jwt from "jsonwebtoken"
import Users from "../models/user.model.js"

const checkUserExists = async (userId) => {
    const user = await Users.findById(userId)
    return !!user
}

const validToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthentified" })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload

        const userExists = await checkUserExists(payload.id)
        if (!userExists) {
            return res.status(401).json({ message: "User no longer exists" })
        }

        next()
    }
    catch (err) {
        return res.status(err.status || 401).json({ message: err.message })
    }
}

export default validToken