import type APIKeyDoc from "../models/APIKeyModel.js";
import { APIKeyModel } from "../models/APIKeyModel.js";

async function findByKey(key: string): Promise<APIKeyDoc | null> {
    return APIKeyModel.findOne({ key, status: true })
}

export default findByKey;