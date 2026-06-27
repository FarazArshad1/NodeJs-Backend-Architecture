import type { Request } from "express";
import type { UserDoc } from "../models/userModel.js";
import type APIKeyDoc from "../models/APIKeyModel.ts";
import type KeyStoreDoc from "../models/keyStoreModel.ts";

export declare interface PublicRequest extends Request {
  apiKey?: APIKeyDoc;
}

export declare interface ProtectedRequest extends Request {
  user?: UserDoc | null
  accessToken?: string
  keystore?: KeyStoreDoc
}
