import { Router } from "express";
import { getSymbolHistoryPrice, getSymbolInfo } from "./symbol.controller";

export const symbolRouter = Router();

symbolRouter.get("/", getSymbolInfo);

symbolRouter.get(`/history`, getSymbolHistoryPrice);

symbolRouter.get("/current-price", getSymbolInfo);
