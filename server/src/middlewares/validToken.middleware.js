import jwt from "jsonwebtoken"

const validToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token){
        return res.status(401).json({message: "Unauthentified"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded /* decoded = { id: "...", role: "coach", iat: ..., exp: ... } */
        next()
    }
    catch(err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default validToken