import { Request, Response } from "express";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiSuccess } from "../../utils/ApiSuccess";
import {
    OrderList,
    SingleOrderDetails,
    createOrder,
    createSellOrder,
    sellOrder,
} from "./trade.service";
import {
    ISocialModel,
    createSocialPost,
    orderType,
} from "../../models/social.model";
import { getUserByEmail } from "../../models/user.model";
import { strToId } from "../../utils/generic.utils";
import { Schema, SchemaTypes, Types } from "mongoose";
import { increaseSymbolStats } from "../../models/MostTrade";

const _data = {
    id: "d5b5f5c4-6fdd-4140-879d-315408cf793d",
    client_order_id: "a99f6871-1908-4736-bfad-411ddaf00ce1",
    created_at: "2023-09-24T09:33:47.925055319Z",
    updated_at: "2023-09-24T09:33:47.925055319Z",
    submitted_at: "2023-09-24T09:33:47.922945859Z",
    filled_at: null,
    expired_at: null,
    canceled_at: null,
    failed_at: null,
    replaced_at: null,
    replaced_by: null,
    replaces: null,
    asset_id: "c4139ad4-d9d8-44e8-905a-34185ac30bde",
    symbol: "ESTE",
    asset_class: "us_equity",
    notional: null,
    qty: "1",
    filled_qty: "0",
    filled_avg_price: null,
    order_class: "",
    order_type: "market",
    type: "market",
    side: "buy",
    time_in_force: "day",
    limit_price: null,
    stop_price: null,
    status: "accepted",
    extended_hours: false,
    legs: null,
    trail_percent: null,
    trail_price: null,
    hwm: null,
    commission: "0",
    subtag: null,
    source: null,
};

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
        return res.status(500).json(ApiError(error));
    }
};

export const placeOrder = async (req: Request, res: Response) => {
    //buy order
    try {
        const accountId = (req as ICustomRequest).alpaca_id;
        const email = (req as ICustomRequest).user_mail;
        const dbUser = await getUserByEmail(email);
        if (!dbUser) {
            return res.status(404).json(ApiError(`User not found!`));
        }
        increaseSymbolStats(
            req.body.symbol,
            Number(req.body.quantity),
            Number(req.body.totalPrice),
        );
        const orderResult = await createOrder(accountId, req.body);
        // console.log(`🎁🎀`, req.body);
        // console.log(`user id = ${dbUser._id}`);
        const postObj: ISocialModel = {
            symbol: orderResult.symbol,
            user: new Types.ObjectId(dbUser.id),
            order_id: orderResult.id as string,
            buyer_id: accountId,
            text: (req.body?.post as string) ?? "",
            buying_price: req.body?.totalPrice,
            like: [],
            links: req.body?.links || [],
            order_type: (orderResult?.order_type as orderType) ?? " market",
            order_side: "buy",
        };
        const post = await createSocialPost(postObj);
        // console.log(post);
        // update symbolstats

        return res
            .status(200)
            .json(ApiSuccess({ order: orderResult, post: postObj }));
    } catch (error) {
        console.log(error);
        return res.status(500).json(ApiError(error));
    }
};
export const placeSellOrder = async (req: Request, res: Response) => {
    // try {
    //     const alpacaId = (req as ICustomRequest).alpaca_id;
    //     const { symbol, qty, time_in_force, type } = req.body;
    //     const sellOrderForm = {
    //         side: "sell",
    //         type: type ?? "market",
    //         time_in_force: time_in_force ?? "day",
    //         symbol: symbol,
    //         qty: qty,
    //     };

    //     const result = await sellOrder(alpacaId, sellOrderForm);

    //     return res.status(200).json(ApiSuccess(req.body));
    // } catch (error) {
    //     return res.status(500).json(ApiError(`${(error as Error).message}`));
    // }
    try {
        const accountId = (req as ICustomRequest).alpaca_id;
        const email = (req as ICustomRequest).user_mail;
        const dbUser = await getUserByEmail(email);
        if (!dbUser) {
            return res.status(404).json(ApiError(`User not found!`));
        }

        const orderResult = await createSellOrder(accountId, req.body);
        // console.log(`🎁🎀`, req.body);
        // console.log(`user id = ${dbUser._id}`);
        const postObj: ISocialModel = {
            symbol: orderResult.symbol,
            user: new Types.ObjectId(dbUser.id),
            order_id: orderResult.id as string,
            buyer_id: accountId,
            text: (req.body?.post as string) ?? "",
            buying_price: req.body?.totalPrice,
            like: [],
            links: req.body?.links || [],
            order_type: (orderResult?.order_type as orderType) ?? " market",
            order_side: "sell",
        };
        const post = await createSocialPost(postObj);
        // console.log(post);
        increaseSymbolStats(
            postObj.symbol!,
            Number(req.body.quantity),
            Number(postObj.buying_price),
        );
        return res
            .status(200)
            .json(ApiSuccess({ order: orderResult, post: postObj }));
    } catch (error) {
        // console.log(error);
        return res.status(500).json(ApiError(error));
    }
};
