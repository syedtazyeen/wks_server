"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.data = null;
        this.success = false;
        this.statusCode = statusCode;
        this.error = errors;
        this.success = false;
        if (this.stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ServerError;
