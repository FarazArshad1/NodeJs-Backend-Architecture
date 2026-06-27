import mongoose, { Schema, Document, Model, Types } from "mongoose"
import bcrypt from "bcryptjs"

export interface UserDoc extends Document {
  _id : Types.ObjectId,
  name?: string,
  email?: string,
  password?: string,
  matchPassword?: (enteredPassword: string) => Promise<boolean>
}

export interface userModel extends Model<UserDoc> {
  matchPassword?: (enteredPassword: string) => Promise<boolean>
}

export const DOCUMENT_NAME = "User"
export const COLLECTION_NAME = "users"

const userSchema = new Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Moongoose Middleware, it runs automatically before a document is saved in mongodb
// Checks if password is modified , if it is then the incoming password will be hashed else not
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  if (this.password) this.password = await bcrypt.hash(this.password, salt)
})

const User: Model<UserDoc> = mongoose.model<UserDoc>(DOCUMENT_NAME, userSchema, COLLECTION_NAME)

export default User
