class ServerError extends Error {
    public statusCode: number;
    public data: any | null = null;
    public success: boolean = false;
    public error: any[];

    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors: any[] = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = errors;
        this.success = false

        if (this.stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ServerError;
