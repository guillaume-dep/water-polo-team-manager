import bcrypt from 'bcrypt'
import Users from "../models/user.model.js"
import { generateToken, setTokenCookie } from '../utils/jwt.js';

/**
 * route : auth/register 
 * Create an account for a new user
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} JSON answer with the information of the user
 */
export const register = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const {name, email, password, role} = req.body
        const existing = await Users.findOne({email})
        if (existing){
            return res.status(409).json({message: "Email already used"})
        }
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const token = generateToken(user)
        setTokenCookie(res, token)

        /* success */
        res.status(201).json({ id: user._id, name: user.name, role: user.role })
    }

    catch(err){
        res.status(500).json({message: err.message})
    }
}

/**
 * route : auth/login
 * Log a user in his account
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} JSON answer with the information of the user
 */
export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({email})
        if (!user){
            return res.status(401).json({message: "Invalid credentials"})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = generateToken(user)
        setTokenCookie(res, token)

        /* success */
        res.status(200).json({ id: user._id, name: user.name, role: user.role })
    }

    catch(err){
        res.status(500).json({message: err.message})
    }
}

/**
 * route : auth/logout
 * Logout a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} 
 */
export const logout = async(req, res) => {
    res.clearCookie("token")
    res.json({message: "Disconnected"})
}