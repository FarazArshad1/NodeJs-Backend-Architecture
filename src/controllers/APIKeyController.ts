import type APIKeyDoc from "../models/APIKey.js";
import { APIKeyModel } from "../models/APIKey.js";

async function findByKey(key: string): Promise<APIKeyDoc | null> {
    return APIKeyModel.findOne({ key, status: true })
}

export default findByKey;