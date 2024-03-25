import express from 'express'

export default class ServerResponse extends Response{
    public statusCode: number;
    public success: boolean;
    public data: any | null;
    public error: any[] | null;
    public message: string;

    constructor(
        statusCode: number,
        success: boolean,
        data: any | null = null,
        error: any[] | null = null,
        message: string = ""
    ) {
        super(message)
        this.statusCode = statusCode;
        this.success = success;
        this.data = data;
        this.error = error;
        this.message = message;
    }

    send(res: express.Response): void {
        res.status(this.statusCode).json({
            success: this.success,
            data: this.data,
            error: this.error,
            message: this.message,
        });
    }
}