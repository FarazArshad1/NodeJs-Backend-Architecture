import express from "express"
import type { Request, Response, NextFunction } from "express"
import cors from "cors"
import "./database/index.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import { corsUrl, environment, port } from "./config.js"
import todoRoutes from "./routes/todoRoutes.js"
import { APIError, ErrorType } from "./core/apiError.js"

import Logger from "./core/Logger.js"
import { InternalError } from "./core/customError.js"

const PORT = port ?? 8080

export const app: express.Express = express()

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof APIError) {
    APIError.handle(err, res)

    if (err.type === ErrorType.INTERNAL) {
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
      Logger.error(err.stack)

      if (environment === "development") {
        res.status(err.statusCode).json({
          message: err.message, stack: err.stack
        })
      }
      APIError.handle(new InternalError(), res)
    } 
    }
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  Logger.info(`Server is running on port ${PORT}`)
})
