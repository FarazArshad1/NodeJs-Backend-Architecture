import type { UserDoc } from "../models/userModel.js";

export enum Header {
    API_KEY = 'x-api-key'
}

export async function createTokens(user: UserDoc, accessTokenKey: string, refreshTokenKey: string) {
    const accessToken = await JWT.encode()
}