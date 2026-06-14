import mongoose from "mongoose"
import { db } from "../config.js"

let dbURI = `mongodb://${db.host}:${db.port}/${db.name}`

if (db.user && db.password) {
  dbURI = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`
}

mongoose
  .connect(dbURI)
  .then(() => "MongoDB Connected")
  .catch(err => console.log(err))
