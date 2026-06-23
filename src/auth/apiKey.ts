import validator, { ValidatorSource } from "../helper/validator.js"
import express, { type Router, type NextFunction, type Request, type Response } from "express"
import { APIkeySchema } from "./schemas.js"
import { Header } from "./utils.js"
import { ForbiddenError } from "../core/customError.js"
import findByKey from "../controllers/APIKeyController.js"

const router: Router = express.Router()

router.use(validator(APIkeySchema, ValidatorSource.HEADER))

async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[Header.API_KEY]?.toString()
    if (!key) throw new ForbiddenError()
        const apiKey = await findByKey(key)

        if (!)
}

export default router