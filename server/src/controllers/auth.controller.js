import express from 'express'
import bcrypt from 'bcrypt'
import Users from "../models/user.model"
import { generateToken, setTokenCookie } from '../utils/jwt';

/* Salt for password hashing */
const SALT_ROUNDS = 10;

/**
 * route : auth/register 
 * Create an account for a new user
 * @param {Object} req 
 * @param {Object} res 
 * @returns {JSON} JSON answer with the information of the user
 */
export const register = async(req, res) => {
    try {
        const {name, email, password, role} = req.body
        const existing = await Users.find({email})
        if (existing){
            return res.status(409).json({message: "Email already used"})
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const token = generateToken(res, user)
        setTokenCookie(res, token)

        /* success */
        res.status(201).json({ id: user._id, name: user.name, role: user.role })
    }

    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const login = async(req, res) => {
    try {
        
    }
    catch(){
        
    }
}

export const logout = async(req, res) => {
    try {

    }
    catch(){
        
    }
}