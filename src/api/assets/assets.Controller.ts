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

export const getStocks = async (req: Request, res: Response) => {
    try {
        const { limit } = req.query;
        let queryLimit = Number(limit) ?? 0;
        if (!queryLimit) {
            queryLimit = 50;
        }
        const Allstock = await TradeSdk.getAssets({
            status: "active",
        });
        console.log("newsData", Allstock);
        const data = Allstock.filter(
            (v: any) =>
                v.status == "active" &&
                v.tradable == true &&
                v.class != "crypto",
        );

        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
