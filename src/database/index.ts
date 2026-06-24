import mongoose from "mongoose"
import { db } from "../config.js"
import Logger from "../core/Logger.js"
import { printError } from "../utils/printError.js"
import type { Error } from "mongoose"


// Build the connection String
export const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize,
  maxPoolSize: db.maxPoolSize,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
}

Logger.debug(dbURI)

function setRunValidators() {
  return {
    runValidators: true
  }
}

mongoose.set("strictQuery", true)


// Create the database Connection
mongoose
  .plugin(
    (schema: any) => {
      schema.pre("findOneAndUpdate", setRunValidators)
      schema.pre("updateMany", setRunValidators)
      schema.pre("updateOne", setRunValidators)
      schema.pre("update", setRunValidators)
    }
  )

  .connect(dbURI, options)
  .then(() => {
    Logger.info("Mongoose Connection Done")
  })
  .catch((e: any) => {
    Logger.info("Mongoose Connection Error")
    Logger.error(e)
    printError(e)
  })

// Connection Events

// When Successfully Connected
mongoose.connection.on("connected", () => {
  Logger.debug("Mongoose default connection open to " + dbURI)
})

// If Connection Throws an error
mongoose.connection.on("error", (err: string) => {
  Logger.debug("Mongoose default connection error " + err)
})

// When Connection is Disconnected
mongoose.connection.on("disconnected", () => {
  Logger.debug("Mongoose default connection disconnected")
})

// If the Node process ends, close the Mongoose Connection
process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    Logger.info(
      "Mongoose default connection disconnected through app termination"
    )
    process.exit(0)
  })
})


export const connection = mongoose.connection