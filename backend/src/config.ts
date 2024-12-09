import { DoubleCsrfConfigOptions } from 'csrf-csrf'
import { CookieOptions } from 'express'
import ms from 'ms'

export const { PORT = '3000' } = process.env
export const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env
export const { JWT_SECRET = 'JWT_SECRET' } = process.env
export const ACCESS_TOKEN = {
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '10m',
}
export const REFRESH_TOKEN = {
    secret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
    secure: process.env.NODE_ENV === 'production',
    cookie: {
        name: 'refreshToken',
        options: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: ms(process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
            path: '/',
        } as CookieOptions,
    },
}

export const doubleCsrfOptions: DoubleCsrfConfigOptions = {
    getSecret: () => process.env.CSRF_SECRET || '___Secret___',
    cookieName: process.env.CSRF_COOKIE_NAME || '__Host-larek.x-csrf-token',
    cookieOptions: {
        sameSite: 'strict',
        path: '/',
        secure: process.env.CSRF_COOKIE_IS_SECURE
            ? process.env.CSRF_COOKIE_IS_SECURE.toUpperCase() === 'TRUE'
            : true,
    },
}

export const allowedOrigins =
    process.env.ORIGIN_ALLOW && process.env.ORIGIN_ALLOW.indexOf(',') >= 0
        ? process.env.ALLOWED_ORIGINS?.split(',')
        : process.env.ORIGIN_ALLOW || 'http://localhost'

export const rateLimitConfig = {
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: 'Слишком много запросов с этого IP, попробуйте позже',
    standardHeaders: true,
    legacyHeaders: false,
}

export const fileSizeConfig = {
    maxSize: Number(process.env.MAX_FILE_SIZE) || 10e6,
    minSize: Number(process.env.MIN_FILE_SIZE) || 2e3,
}
