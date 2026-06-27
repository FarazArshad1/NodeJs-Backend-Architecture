import express, { Router, type Response, type NextFunction } from "express"
import { getAccessToken, validateTokeData } from "./utils.js"
import type { ProtectedRequest } from "../types/app-request.js"
import { tokenInfo } from "../config.js"
import * as JWT from "../core/JWT.js"
import User from "../models/userModel.js"
import { Types } from "mongoose"
import { BadRequestError, TokenExpiredError } from "../core/customError.js"
import { KeyStoreModel } from "../models/keyStoreModel.js"
import asyncHandler from "../helper/asyncHandler.js"

const router: Router = express.Router()

export default router.use(
    asyncHandler(
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            const accessToken = req.cookies.accessToken
            req.accessToken = accessToken

            try {
                const payload = await JWT.validate(accessToken, tokenInfo.secret)
                validateTokeData(payload)

                const user = await User.findById(new Types.ObjectId(payload.sub))

                if (!user) throw new BadRequestError("User does not exist")
                req.user = user

                const keystore = await KeyStoreModel.findOne({
                    client: req.user,
                    primaryKey: payload.prm,
                    status: true
                })

                if (!keystore) throw new BadRequestError("Invalid access Token")
                req.keystore = keystore
                next()
            } catch (error) {
                throw new TokenExpiredError("Token Expired")
            }
        }
    )
)