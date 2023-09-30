import { Router } from "express";
import {
    SellStock,
    buyStock,
    getAllStock,
    getCachedAsset,
} from "./assets.Controller";

export const StockRouter = Router();

StockRouter.get("/", getAllStock);
StockRouter.get(`/:name`, getCachedAsset);
StockRouter.post("/sell", SellStock);
StockRouter.post("/buy", buyStock);
// StockRouter.get("/position", position);
