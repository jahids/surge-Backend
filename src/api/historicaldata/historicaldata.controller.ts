import { Request, Response } from "express";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import axios from "axios";



export const historicaldata = async (req: Request, res: Response) => {
    const { symbol} = req.params;
    const accessKey = '9bb7121cefa8c8c7d092d4676813b413';
    const dateFrom = '2023-09-13';
    const dateTo = '2023-09-23';
    try {
        const data = axios.get(`http://api.marketstack.com/v1/eod`, {
            params: {
                access_key: accessKey,
                symbols: symbol,
                date_from: dateFrom,
                date_to: dateTo,
              },
        })
        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
