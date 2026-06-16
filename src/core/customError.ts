import { APIError, ErrorType } from "./apiError.js";

export class BadRequestError extends APIError {
    constructor(message: string = "Bad Request") {
        super(ErrorType.BAD_REQUEST, 400, message)
    }
}

export class NotFoundError extends APIError {
    constructor(message: string = "Not Found") {
        super(ErrorType.NOT_FOUND, 404, message)
    }
}

export class AuthFailureError extends APIError {
    constructor(message: string = "Invalid Credentials") {
        super(ErrorType.UNAUTHORIZED, 401, message);
    }
}

export class ForbiddenError extends APIError {
    constructor(message: string = "Permission Denied") {
        super(ErrorType.FORBIDDEN, 403, message);
    }
}

export class InternalError extends APIError {
    constructor(message: string = "Internal Error") {
        super(ErrorType.INTERNAL, 500, message);
    }
}

export class TokenExpiredError extends APIError {
    constructor(message: string = "Token is expired") {
        super(ErrorType.TOKEN_EXPIRED, 401, message);
    }
}

export class BadTokenError extends APIError {
    constructor(message: string = "Token is not valid") {
        super(ErrorType.BAD_TOKEN, 401, message);
    }
}

export class AccessTokenError extends APIError {
    constructor(message: string = "Invalid access token") {
        super(ErrorType.ACCESS_TOKEN_ERROR, 401, message);
    }
}
