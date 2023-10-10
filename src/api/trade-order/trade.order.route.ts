import { Router, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import {
    placeOrder,
    placeSellOrder,
    singleOrder,
    userOrderList,
} from "./trade.order.ctrl";

export const tradeOrderRouter = Router();

tradeOrderRouter.get("/", userOrderList);
tradeOrderRouter.get("/:order_id", singleOrder);
tradeOrderRouter.post(`/`, placeOrder);

tradeOrderRouter.post(`/sell`, placeSellOrder);
