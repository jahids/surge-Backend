import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { findUserByDbId } from "../models/user.model";
import {
    ICustomRequest,
    IPortfolioRequest,
} from "../types/interfaces/ICustomRequest";
export default async function DbIdValidator(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const userDbId = (req as ICustomRequest).dbId;
        const { dbId } = req.query;
        let user = null;
        if (!dbId) {
            user = await findUserByDbId(userDbId);
        } else {
            user = await findUserByDbId(dbId?.toString());
        }
        if (!user?.alpaca_id) {
            return res.status(400).json(ApiError(`user doesn't exist`));
        }
        const alpacaId = user.alpaca_id;
        const external_dbId = user._id;
        if (!alpacaId || !external_dbId) {
            return res.status(400).json(ApiError(`user doesn't exist!`));
        }
        (req as IPortfolioRequest).external_id = alpacaId;
        (req as IPortfolioRequest).external_dbId = external_dbId.toString();
        console.log(`🔥🔥at DbIdValidator : ${alpacaId}`);
        next();
    } catch (error) {
        return res.status(400).json(ApiError(`user doesn't exist!`));
    }
}
