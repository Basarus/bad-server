import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import fs from 'node:fs/promises'
import { extname } from 'path'
import { allowedTypes } from '../middlewares/file'
import BadRequestError from '../errors/bad-request-error'
import { fileSizeConfig } from '../config'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }

    if (req.file.size < fileSizeConfig.minSize || !req.file || !req.file.path) {
        await fs.unlink(req.file.path)
        return next(new BadRequestError('Размер файла слишком мал'))
    }

    if (!allowedTypes.includes(`image/${extname(req.file.filename)}`))
        return next(new BadRequestError('Некорректный формат файла'))

    try {
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
