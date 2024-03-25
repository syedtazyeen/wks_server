"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerResponse extends Response {
    constructor(statusCode, success, data = null, error = null, message = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = success;
        this.data = data;
        this.error = error;
        this.message = message;
    }
    send(res) {
        res.status(this.statusCode).json({
            success: this.success,
            data: this.data,
            error: this.error,
            message: this.message,
        });
    }
}
exports.default = ServerResponse;
