import { Router } from "express";
import { historicaldata } from "./historicaldata.controller";

export const historicalRoute = Router();

historicalRoute.get("/:symbol", historicaldata);