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

export function ApiError(
    error: string = "Default Error Message",
    data: any = null,
) {
    const resultObj = {
        success: false,
        data: data,
        error: error ?? "Default Success Message",
    };

    return resultObj;
}
