import type { JwtPayload } from "jsonwebtoken";
import { tokenInfo } from "../config.js";
import { BadRequestError, InternalError } from "../core/customError.js";
import * as JWT from "../core/JWT.js";
import { JWTPayload } from "../core/JWT.js";
import type { UserDoc } from "../models/userModel.js";
import { Types } from "mongoose";

export enum Header {
    API_KEY = 'x-api-key'
}

export async function createTokens(user: UserDoc, accessTokenKey: string, refreshTokenKey: string) {
    const accessToken = await JWT.encode(
        new JWTPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            accessTokenKey,
            tokenInfo.accessTokenValidity
        ),
        tokenInfo.secret
    )

    if (!accessToken) throw new InternalError()


    const refreshToken = await JWT.encode(
        new JWTPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            refreshTokenKey,
            tokenInfo.refreshTokenValidity
        ),
        tokenInfo.secret
    )

    if (!refreshToken) throw new InternalError()

    return { accessToken, refreshToken }
}

export const getAccessToken = (authorization?: string): string => {
    if (!authorization) throw new BadRequestError("Invalid Autorization")
    if (!authorization.startsWith("Bearer")) throw new BadRequestError("Invalid Authorization")

    const token = authorization.split(" ")[1]
    if (!token) throw new BadRequestError("Invalid Authorization")
    return token
}


export const validateTokeData = (payload: JwtPayload): boolean => {
    if (
        !payload ||
        !payload.iss ||
        !payload.aud ||
        !payload.sub ||
        !payload.prm ||
        payload.iss !== tokenInfo.issuer ||
        payload.aud !== tokenInfo.audience ||
        !Types.ObjectId.isValid(payload.sub)
    ) {
        throw new BadRequestError("Invalid Access token")
    }

    return true
}
