import { Router } from "express";
import { getAllStock } from "./assets.Controller";

export const StockRouter = Router();

StockRouter.get("/", getAllStock);
