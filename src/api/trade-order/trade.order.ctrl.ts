import { Request, Response } from "express";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiSuccess } from "../../utils/ApiSuccess";
import {
    OrderList,
    SingleOrderDetails,
    createOrder,
    sellOrder,
} from "./trade.service";

export const userOrderList = async (req: Request, res: Response) => {
    try {
        const userId = (req as ICustomRequest).alpaca_id;

        // console.log(`user id `, userId);
        const data = await OrderList(userId);
        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        // console.log(error);
        return res.status(500).json(ApiError(`${(error as Error).message}`));
    }
};
export const singleOrder = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.params;
        const userId = (req as ICustomRequest).alpaca_id;
        const data = await SingleOrderDetails(userId, order_id);
        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        return res.status(500).json(ApiError(`${(error as Error).message}`));
    }
};

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const accountId = (req as ICustomRequest).alpaca_id;

        const orderResult = await createOrder(accountId, req.body);

        return res.status(200).json(ApiSuccess(orderResult));
    } catch (error) {
        return res.status(500).json(ApiError(`${(error as Error).message}`));
    }
};
export const placeSellOrder = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as ICustomRequest).alpaca_id;
        const { symbol, qty, time_in_force, type } = req.body;
        const sellOrderForm = {
            side: "sell",
            type: type ?? "market",
            time_in_force: time_in_force ?? "day",
            symbol: symbol,
            qty: qty,
        };

        const result = sellOrder(alpacaId, sellOrderForm);

        return res.status(200).json(ApiSuccess(req.body));
    } catch (error) {
        return res.status(500).json(ApiError(`${(error as Error).message}`));
    }
};
