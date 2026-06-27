import pkg, { type SignOptions, type JwtPayload } from "jsonwebtoken"
const { sign, decode: jwtdecode, verify } = pkg;
import { BadTokenError, InternalError, TokenExpiredError } from "./customError.js"

export class JWTPayload {

    aud: string
    sub: string
    iss: string
    iat: number
    exp: number
    prm: string


    constructor(
        issuer: string,
        audiance: string,
        subject: string,
        param: string,
        validity: number
    ) {
        this.iss = issuer
        this.aud = audiance
        this.sub = subject
        this.iat = Math.floor(Date.now() / 1000)
        this.exp = this.iat + validity
        this.prm = param
    }
}

export function encode(payload: JWTPayload, secret: string): Promise<string> {
    if (!secret) throw new InternalError("Token Generation Failure")
    const options: SignOptions = { algorithm: "HS256" }
    try {
        return new Promise((resolve, reject) => {
            sign({ ...payload }, secret, options, (err, token) => {
                if (err) return reject(new InternalError("Token Generation Failed"))
                resolve(token as string)
            })
        })
    } catch (error) {
        throw new InternalError("Token Generation Failed")
    }
}

export async function decode(token: string): Promise<JwtPayload> {
    if (!token) throw new InternalError("Token Decoding Failure")

    try {
        const decoded = jwtdecode(token)
        if (!decoded || typeof decoded === "string") throw new BadTokenError()
        return decoded as JwtPayload
    } catch (error) {
        throw new BadTokenError()
    }
}


export async function validate(token: string, secret: string): Promise<JwtPayload> {
    if (!token) throw new InternalError("Token Validation Failure")
    try {
        return await new Promise((resolve, reject) => {
            verify(token, secret, (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return reject(new TokenExpiredError())
                    }
                    return reject(new BadTokenError())
                }
                resolve(decoded as JwtPayload)
            })
        })
    } catch (error) {
        if (error instanceof TokenExpiredError || error instanceof BadTokenError) throw error
        throw new InternalError("Token Validation Failure")
    }
}

