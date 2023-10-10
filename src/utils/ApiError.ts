import { AxiosError } from "axios";

// @desc Structures data from error with more relevant data
export class ApiRequestError extends Error {
    statusCode: number;
    error: unknown;
    data: [] | object;

    constructor(data: object | [], statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

export function ApiError(error: any, data: any = null) {
    let finalError = error;
    if (error instanceof Error) {
        finalError = error.message;
    }
    if (error instanceof AxiosError) {
        finalError = error.response?.data?.error;
    }

    const resultObj = {
        success: false,
        data: data,
        error: finalError ?? error.response?.data,
    };

    return resultObj;
}
