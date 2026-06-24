import validator, { ValidatorSource } from "../helper/validator.js"
import express, { type Router, type NextFunction, type Request, type Response } from "express"
import { APIkeySchema } from "./schemas.js"
import { Header } from "./utils.js"
import { ForbiddenError } from "../core/customError.js"
import findByKey from "../controllers/APIKeyController.js"
import type { PublicRequest } from "../types/app-request.js"

const router: Router = express.Router()

export default router.use(
    validator(APIkeySchema, ValidatorSource.HEADER),

    async (req: PublicRequest, res: Response, next: NextFunction) => {
        const key = req.headers[Header.API_KEY]?.toString()
        if (!key) throw new ForbiddenError()

        const APIKey = await findByKey(key)
        if (!APIKey) throw new ForbiddenError()
        req.apiKey = APIKey

        return next()
    }
)