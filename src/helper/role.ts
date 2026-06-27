import type { NextFunction, Request, Response } from "express";
import type { RoleCode } from "../models/roleModel.js";
import type { RoleRequest } from "../types/app-request.js";

export default (...roleCodes: RoleCode[]) => {
    return (req: RoleRequest, res: Response, next: NextFunction) => {
        req.currentRoleCodes = roleCodes
        next()
    }
}