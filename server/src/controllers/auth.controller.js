import bcrypt from 'bcrypt'
import { generateToken, setTokenCookie } from '../utils/jwt.js';
import { checkUserData, checkUserEmail, checkUserPassword } from '../utils/logicChecker.js';

import AppError from "../utils/AppError.js"

import Users from "../models/user.model.js"

/**
 * route : auth/register 
 * Create an account for a new user
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} JSON answer with the information of the user
 */
export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const { name, email, password, role } = req.body
        checkUserData(name, email, password, role)

        const existing = await Users.findOne({ email })
        if (existing) throw new AppError("Email already used", 409)

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            name,
            email,
            passwordHash: hashedPassword,
            role
        })

        const token = generateToken(user)
        setTokenCookie(res, token)

        /* success */
        res.status(201).json({ id: user._id, name: user.name, role: user.role, email: user.email, })
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

/**
 * route : auth/login
 * Log a user in his account
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} JSON answer with the information of the user
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (!user) throw new AppError("Invalid credentials", 401)

        const validPassword = await bcrypt.compare(password, user.passwordHash)
        if (!validPassword) throw new AppError("Invalid credentials", 401)

        const token = generateToken(user)
        setTokenCookie(res, token)

        /* success */
        res.status(200).json({ id: user._id, name: user.name, role: user.role, email: user.email })
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

/**
 * route : auth/logout
 * Logout a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} 
 */
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Disconnected" })
}

export const getUserData = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
        res.json({
            name: user.name,
            email: user.email,
            role: user.role
        })

    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const updateUserData = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
        const { name, email } = req.body

        const newName = name ?? user.name
        const newEmail = email ?? user.email
        checkUserName(newName)

        if (email) {
            checkUserEmail(email)
            if (email !== user.email) {
                const existing = await Users.findOne({ email })
                if (existing) throw new AppError("Email already used", 409)
            }
        }

        user.name = newName
        user.email = newEmail
        await user.save()
        res.json({ name: user.name, email: user.email, role: user.role })
    }

    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const user = await Users.findById(req.user.id)

        const { currentPassword, newPassword } = req.body
        const validPassword = await bcrypt.compare(currentPassword, user.passwordHash)
        if (!validPassword) throw new AppError("Invalid current password", 401)

        checkUserPassword(newPassword)

        const newPasswordHash = await bcrypt.hash(newPassword, salt)
        user.passwordHash = newPasswordHash
        await user.save()
        res.status(200).json({ id: user._id, name: user.name, role: user.role })
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.user.id)
        res.clearCookie("token")
        res.json({ message: "Account deleted" })
    }

    catch (err) {
        res.status(500).json({ message: err.message })
    }
}