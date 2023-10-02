import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { getMovers } from "./topMovers.service";

export const getAllMovers = async (req: Request, res: Response) => {
    const limit = req.params.top;
    try {
        console.log(`limit=${limit}`);
        const newsData = await getMovers(limit);
        return res.status(200).json(ApiSuccess(newsData));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
