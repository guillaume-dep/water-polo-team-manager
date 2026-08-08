import jwt from "jsonwebtoken"
import Users from "../models/user.model.js"

/* To prevent connection from deleted account with a JWT still valid */
const checkUserExists = async(req, res) => {
    const user = await Users.findById(req.user.id)
    if (!user) return res.status(401).json({message: "User no longer exists"})
}

const validToken = async(req, res, next) => {
    const token = req.cookies.token

    if (!token){
        return res.status(401).json({message: "Unauthentified"})
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload /* payload = { id: "...", role: "coach", iat: ..., exp: ... } */
        await checkUserExists(req, res)
        next()
    }
    catch(err){
        return res.status(err.status || 401).json({ message: err.message });
    }
}

export default validToken