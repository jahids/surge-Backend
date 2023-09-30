import { Request } from "express";
export interface ICustomRequest extends Request {
    user_mail: string;
    alpaca_id: string;
    dbId: string;
}

export interface IPortfolioRequest extends ICustomRequest {
    external_id?: string;
    external_dbId?: string;
}
