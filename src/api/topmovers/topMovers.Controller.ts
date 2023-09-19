import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { getMovers } from "./topMovers.service";



export const getAllMovers = async (req: Request, res: Response) => {
    const symbol = req.params.top;
    try {
        const newsData = await getMovers(symbol);
        return res.status(200).json(ApiSuccess(newsData));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
