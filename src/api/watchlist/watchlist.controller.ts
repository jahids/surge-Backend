import { Request, Response, response } from "express";
import {
    ICustomRequest,
    IPortfolioRequest,
} from "../../types/interfaces/ICustomRequest";
import { ApiError } from "../../utils/ApiError";
import { BrokerInstance } from "../../utils/AlpacaInstance";
import { ApiSuccess } from "../../utils/ApiSuccess";
import {
    addDbWatchlist,
    createDefaultWatchlist,
    getUserDbWatchlist,
    updateDbWatchlist,
} from "./watchlist.service";

export const getWatchList = async (req: Request, res: Response) => {
    try {
        //
        const { limit } = req.query;

        const alpacaId = (req as IPortfolioRequest).alpaca_id;
        const dbId = (req as IPortfolioRequest).dbId;
        if (!alpacaId || !dbId) {
            return res.status(400).json(ApiError(`alpaca id not found!`));
        }
        const result = await getUserDbWatchlist(
            dbId,
            Number(limit) || Number.MAX_SAFE_INTEGER,
        );
        return res.status(200).send(ApiSuccess(result));
    } catch (error) {
        return res.status(400).json(ApiError(error));
    }
};

export const addSymbolToWatchList = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const dbId = (req as IPortfolioRequest).dbId;
        if (!dbId || !name) {
            return res.status(400).json(ApiError(`alpaca id not found!`));
        }
        const result = await updateDbWatchlist(
            dbId.toString(),
            name.toString(),
        );
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(400).json(ApiError(error));
    }
};

export const deleteSymbolFromWatchList = async (
    req: Request,
    res: Response,
) => {
    try {
        //
        const result = "getting watch list";
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(400).json(ApiError(error));
    }
};
