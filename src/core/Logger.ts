import winston from 'winston'
const { createLogger, format, transports } = winston
import { environment, logDirectory } from "../config.js"
import path from 'node:path'
import fs from "fs"
import DailyRotateFile from 'winston-daily-rotate-file'

let dir = logDirectory ?? "logs"

if (!dir) dir = path.resolve('logs')

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const logLevel = environment == "development" ? "debug" : "warn"

const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    filename: `${dir}/resourceLimits-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
    )
})

export default createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp(),
                format.json(),
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
})