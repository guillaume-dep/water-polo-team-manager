import rateLimit from "express-rate-limit"

const isDev = process.env.NODE_ENV !== 'production'

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 1000 : 100,
    message: { message: "Too many requests, please try again later" }
})

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 100 : 10,
    message: { message: "Too many attempts, please try again later" }
})