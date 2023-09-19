import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { getSpecificNews, getallnews } from "./news.service";

export const News = async (req: Request, res: Response) => {
    // console.log("hello news run");
    try {
        //  const newsData = await TradeSdk.getNews({ limit: 1 }); //getAllAlpacaAccount();
        const newsData = await getallnews(); //getAllAlpacaAccount();
        // console.log("newsData", newsData);
        return res.status(200).json(ApiSuccess(newsData));
        // return res.status(200).json(req.body);
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const specificNews = async (req: Request, res: Response) => {
    // console.log("hello news run");
    const symbol = req.params.symbol;
    try {
        const newsData = await getSpecificNews(symbol); //getAllAlpacaAccount();
        // console.log("newsData", newsData);
        return res.status(200).json(ApiSuccess(newsData));
        // return res.status(200).json(req.body);
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
