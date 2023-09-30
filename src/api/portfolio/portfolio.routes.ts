import { Request, Response, Router } from "express";
import {
    getPortfolio,
    getOpenPositions,
    getUserTradeActivity,
    getUserRawMargin,
} from "./portfolio.contrller";
import DbIdValidator from "../../middleware/validateDbId";

export const portfolioRouter = Router();

portfolioRouter.use(DbIdValidator);

portfolioRouter.get("/", getPortfolio);
portfolioRouter.get("/raw", getUserRawMargin);

portfolioRouter.get("/open-positions", getOpenPositions); //dbId as query params
portfolioRouter.get(`/trade-activity`, getUserTradeActivity);
