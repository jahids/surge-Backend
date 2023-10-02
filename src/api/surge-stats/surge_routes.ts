import { Router } from "express";
import { getTopSurgeMovers } from "./surge_stats.controller";

export const surgeStatsRouter = Router();
surgeStatsRouter.get("/top-movers", getTopSurgeMovers);
