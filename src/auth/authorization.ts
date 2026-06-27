import express, { Router, type NextFunction, type Response } from "express";
import { ForbiddenError } from "../core/customError.js";
import type { RoleRequest } from "../types/app-request.js";
import asyncHandler from "../helper/asyncHandler.js";
import { RoleModel } from "../models/roleModel.js";

const router: Router = express.Router();

router.use(
    asyncHandler(
        async (req: RoleRequest, res: Response, next: NextFunction) => {
            if (!req.user || !req.user.roles || !req.currentRoleCodes) {
                throw new ForbiddenError("Permission Denied");
            }

            const roles = await RoleModel.find({
                code: {
                    $in: req.currentRoleCodes
                },
                status: true
            }).lean();

            if (!roles.length) throw new ForbiddenError("Permission Denied")

            let authorized = false
            for (const userRole of req.user.roles) {
                if (authorized) break
                for (const role of roles) {
                    if (userRole.toString() === role._id.toString()) {
                        authorized = true
                        break
                    }
                }
            }

            if (!authorized) throw new ForbiddenError("Permission Denied")

            return next();
        }
    )
)

export default router;