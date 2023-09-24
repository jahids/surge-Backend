import { Router } from "express";
import { getSymbolInfo } from "./symbol.controller";

export const symbolRouter = Router();

symbolRouter.get("/", getSymbolInfo);
