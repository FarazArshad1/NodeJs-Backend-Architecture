import type { Request, Response, NextFunction } from "express"
import { APIError, ErrorType } from "../core/apiError.js"
import Logger from "../core/Logger.js"
import { environment } from "../config.js"
import { printError } from "../utils/printError.js"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof APIError) {
    APIError.handle(err, res)
    const logMessage = `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`

    if (err.type === ErrorType.INTERNAL) {
      Logger.error(logMessage, err)
    } else {
      Logger.warn(logMessage, err)
    }
    if (environment === 'development') printError(err)
  } else {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    const message = err.message || "Internal Server Error"
    const logMessage = `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`

    Logger.error(logMessage, err)
    if (environment === 'development') printError(err)

    res.status(statusCode).json({
      message: message,
      stack: environment === "development" ? err.stack : null,
    })
  }
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export { errorHandler, notFound }
