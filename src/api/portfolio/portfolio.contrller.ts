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
    UserTradeActivity,
    caclulatePositionValues,
} from "./portfolio.service";

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
        console.log(`id = ${alpacaId}`);
        const result = await UserPositions(alpacaId);
        // console.log(result);
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
        console.log(`id = ${alpacaId}`);
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
        console.log(`id = ${alpacaId}`);
        const result = await UserRawActivity(alpacaId);
        // console.log(result);
        return res.json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
