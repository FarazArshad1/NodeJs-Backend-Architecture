import type { Request } from "express";
import type { UserDoc } from "../models/userModel.js";

export interface ProtectedRequest extends Request {
  user?: UserDoc | null;
}