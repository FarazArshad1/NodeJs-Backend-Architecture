import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";
import { BadRequestError } from "../core/customError.js";


export enum ValidatorSource {
    BODY = "body",
    QUERY = "query",
    HEADER = "headers",
    PARAM = "params"
}

const validateRequest = (schema: ZodSchema, source: ValidatorSource) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = schema.parse(req[source])
            Object.assign(req[source], data)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const message = err.issues.map(e => e.message).join(", ")
                return next(new BadRequestError(message))
            }
            next(err)
        }
    }
}

export default validateRequest