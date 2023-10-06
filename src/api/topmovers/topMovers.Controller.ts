import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { getMovers } from "./topMovers.service";
const sanitizeSymbol = (input: string): string => {
    const match = input.match(/[A-Z]+/);
    return match ? match[0] : "";
};
export const getAllMovers = async (req: Request, res: Response) => {
    const limit = req.params.top;
    try {
        // console.log(`limit=${limit}`);
        const newData = await getMovers("10");
        const gainers = newData?.gainers?.filter((v: { symbol: string }) => {
            return v.symbol.length == sanitizeSymbol(v.symbol).length;
        });
        const losers = newData?.losers?.filter((v: { symbol: string }) => {
            return v.symbol.length == sanitizeSymbol(v.symbol).length;
        });
        return res.status(200).json(
            ApiSuccess({
                gainers: gainers.slice(0, Number(limit)),
                losers: losers.slice(0, Number(limit)),
            }),
        );
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
