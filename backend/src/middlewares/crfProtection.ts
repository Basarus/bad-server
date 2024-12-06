import csrf from 'csurf'
import { Request, Response, NextFunction } from 'express'

const csrfProtection = csrf({ cookie: true })

export const csrfMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    csrfProtection(req, res, next)
}
