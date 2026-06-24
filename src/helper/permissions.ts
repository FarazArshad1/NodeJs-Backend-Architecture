import type { NextFunction, RequestHandler } from "express";
import { Permission } from "../models/APIKeyModel.js";
import type { PublicRequest } from "../types/app-request.js";
import { ForbiddenError } from "../core/customError.js";

function permission(permission: Permission): RequestHandler {
    return (req: PublicRequest, res, next) => {
        try {
            if (!req.apiKey?.permissions) {
                return next(new ForbiddenError("Permission Denied"))
            }

            const exists = req.apiKey.permissions.includes(permission)
            if (!exists) {
                return next(new ForbiddenError("Permission Denied"))
            }

            return next()
        } catch (error) {
            next(error)
        }
    }
}

export default permission;