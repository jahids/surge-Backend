import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { getSpecificNews, getallnews } from "./news.service";

export const News = async (req: Request, res: Response) => {
    // console.log("hello news run");
    try {
        const newsData = await getallnews(); 
        return res.status(200).json(ApiSuccess(newsData));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const specificNews = async (req: Request, res: Response) => {
    const symbol = req.params.symbol;
    try {
        const newsData = await getSpecificNews(symbol);
        return res.status(200).json(ApiSuccess(newsData));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
