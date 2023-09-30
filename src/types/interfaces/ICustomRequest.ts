import { Request } from "express";
export interface ICustomRequest extends Request {
    user_mail: string;
    alpaca_id: string;
    dbId: string;
}
