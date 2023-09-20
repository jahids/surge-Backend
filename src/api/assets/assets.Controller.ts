import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";

export const getAllStock = async (req: Request, res: Response) => {
    try {
        const Allstock = await TradeSdk.getAssets({
            status: "active",
        });
        console.log("newsData", Allstock);
        const data = Allstock.filter(
            (v: any) =>
                v.status == "active" &&
                v.tradable == true &&
                v.class != "crypto",
        ).slice(0, 50);
        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
export const buyStock = async (req: Request, res: Response) => {
    const { symboldata, quantity } = req.body;
    try {
        const order = await TradeSdk.createOrder({
            symbol: symboldata,
            qty: quantity,
            side: "buy",
            type: "market",
            time_in_force: "day",
            client_order_id: Math.random(),
        });
        return res.status(200).json(ApiSuccess(order));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const SellStock = async (req: Request, res: Response) => {
    const { symboldata, quantity } = req.body;
    try {
        const order = await TradeSdk.createOrder({
            symbol: symboldata,
            qty: quantity,
            side: "sell",
            type: "market",
            time_in_force: "day",
            client_order_id: Math.random(),
        });

        console.log("error order", order);
        return res.status(200).json(ApiSuccess(order));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
// export const position = async (req: Request, res: Response) => {

//     try {
//        const postionapiCall = TradeSdk.getPositions()
//         return res.status(200).json(ApiSuccess(postionapiCall));
//     } catch (error) {
//         return res.status(500).json(ApiError((error as Error).message));
//     }
// };
