// @desc Structures data from success with more relevant data
export class SuccessRequest<T> {
    success: boolean;
    message?: string;
    data: T | T[];

    constructor(data: T, message: string) {
        this.success = true;
        this.data = data;

        if (message) {
            this.message = message;
        }
    }
}

export function ApiSuccess(data: any, message: string = "") {
    const resultObj = {
        success: true,
        data: data,
        message: message,
    };

    return resultObj;
}
