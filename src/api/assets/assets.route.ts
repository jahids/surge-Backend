import { Router } from "express";
import { SellStock, buyStock, getAllStock } from "./assets.Controller";

export const StockRouter = Router();

StockRouter.get("/", getAllStock);
StockRouter.post("/sell", SellStock);
StockRouter.post("/buy", buyStock);
// StockRouter.get("/position", position);
