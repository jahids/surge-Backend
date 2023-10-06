import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { findTopTradedSymbols } from "./surge_service";
import { getTotalPriceQuantity } from "../../models/MostTrade";
export const getTopSurgeMovers = async (req: Request, res: Response) => {
    try {
        const { limit } = req.query;
        let finalLimit = 3;
        if (limit && Number(limit.toString())) {
            finalLimit = Number(limit);
        }
        // console.log(`final `, finalLimit);
        const result = await findTopTradedSymbols(finalLimit);
        const { totalQuantity, totalPrice } = await getTotalPriceQuantity();
        const calculatedResult = result?.map((v) => {
            v.pc = ((v.quantity / totalQuantity) * 100).toPrecision(2);
            return v;
        });
        return res.status(200).json(
            ApiSuccess({
                totalPrice,
                totalQuantity,
                list: calculatedResult,
            }),
        );
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
