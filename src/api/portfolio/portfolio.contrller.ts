import { Request, Response, Router } from "express";
import { ApiError } from "../../utils/ApiError";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { findUserByDbId } from "../../models/user.model";
import {
    ICustomRequest,
    IPortfolioRequest,
} from "../../types/interfaces/ICustomRequest";
import {
    UserPortfolio,
    UserPositions,
    UserRawActivity,
    UserSymbolPositions,
    UserTradeActivity,
    caclulatePositionValues,
    insertPortfolioHistoryData,
} from "./portfolio.service";
import DbIdValidator from "../../middleware/validateDbId";
import {
    addNewPortfolioStats,
    getPortfolioStatsById,
} from "../../models/portfolio-stats";

export const getPortfolio = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as IPortfolioRequest).external_id;
        if (!alpacaId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        const marginData = await UserRawActivity(alpacaId);
        const positionData = await caclulatePositionValues(alpacaId);
        const portfolioSummary = {
            account_id: marginData.id,
            value: marginData.position_market_value,
            available_to_invest: marginData.buying_power,
        };

        res.status(200).json(
            ApiSuccess({ ...portfolioSummary, ...positionData }),
        );
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};

export const getOpenPositions = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as IPortfolioRequest).external_id;
        if (!alpacaId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        // console.log(`id = ${alpacaId}`);
        const result = await UserPositions(alpacaId);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
export const getSymbolOpenPositions = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as IPortfolioRequest).external_id;
        const { name } = req.query;
        if (!alpacaId || !name) {
            return res.status(400).json(ApiError(`user/symbol doesn't exist!`));
        }
        const result = await UserSymbolPositions(alpacaId, name.toString());
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};

export const getUserTradeActivity = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as IPortfolioRequest).external_id;
        if (!alpacaId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        // console.log(`id = ${alpacaId}`);
        const result = await UserTradeActivity(alpacaId);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
export const getUserRawMargin = async (req: Request, res: Response) => {
    try {
        const alpacaId = (req as IPortfolioRequest).external_id;
        if (!alpacaId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        // console.log(`id = ${alpacaId}`);
        const result = await UserRawActivity(alpacaId);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};

export const getUserPortfolioHistory = async (req: Request, res: Response) => {
    try {
        const dbId = (req as IPortfolioRequest).external_dbId;
        if (!dbId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        console.log(`🔥🔥`, dbId);
        const result = await getPortfolioStatsById(dbId);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};

export const addUserPortfolioData = async (req: Request, res: Response) => {
    try {
        const dbId = (req as IPortfolioRequest).external_dbId;
        const nv = Number(req.body?.value);
        const value = Number.isNaN(nv) ? 0 : nv;
        const date = req.body?.date ? new Date(req.body.date) : new Date();

        if (!dbId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        console.log(`🔥🔥`, dbId);
        const result = await insertPortfolioHistoryData(dbId, value, date);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
