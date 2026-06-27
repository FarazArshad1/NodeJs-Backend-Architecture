import express from "express"
import cors from "cors"
import "./database/index.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import { corsUrl, environment, port } from "./config.js"
import todoRoutes from "./routes/todoRoutes.js"

import Logger from "./core/Logger.js"

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import { printError } from "./utils/printError.js"

// Catch-all for Synchronous errors
process.on("uncaughtException", (error) => {
  Logger.error("Uncaught Exception:", error);
  printError(error);
  // Ideally, gracefully shut down here as the process is in an unclean state
  // process.exit(1);
});

// Catch-all for Asynchronous (Promise) errors
process.on("unhandledRejection", (reason) => {
  Logger.error("Unhandled Rejection:", reason);
  printError(reason);
});

const PORT = port ?? 8080

export const app: express.Express = express()

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)

app.use(notFound)
app.use(errorHandler)

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    Logger.info(`Server is running on port ${PORT}`)
  })
}

