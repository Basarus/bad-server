import winston from 'winston'
import rateLimit from 'express-rate-limit'
import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { allowedOrigins, DB_ADDRESS, rateLimitConfig } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'

const { PORT = 3000 } = process.env
const app = express()

app.use(rateLimit(rateLimitConfig))

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(serveStatic(path.join(__dirname, 'public')))

app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`)
    next()
})

app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
    logger.error(`${err.message}`)
    next(err)
})

app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.json({ limit: '10kb' }))
app.use(mongoSanitize());
app.use(routes)
app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () =>
            console.log('Server is running on port', PORT)
        )
    } catch (error) {
        console.error('Error connecting to the database:', error)
    }
}

bootstrap()
