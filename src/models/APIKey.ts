import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = "APIKey"
export const COLLECTION_NAME = "apikeys"

export enum Permission {
    GENERAL = "GENERAL"
}

export default interface APIKeyDoc {
    key: string
    version: number
    permissions: Permission[]
    status: boolean
}

const schema = new Schema<APIKeyDoc>({
    key: {
        type: String,
        required: true,
        unique: true,
        maxlength: 1024,
        trim: true
    },
    version: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    permissions: {
        type: [{
            type: String,
            required: true,
            enum: Object.values(Permission)
        }],
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

schema.index({ key: 1, status: 1 })

export const APIKeyModel = model<APIKeyDoc>(DOCUMENT_NAME, schema, COLLECTION_NAME)