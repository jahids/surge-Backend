import { Router } from "express";
import {
    addSymbolToWatchList,
    deleteSymbolFromWatchList,
    getWatchList,
} from "./watchlist.controller";
import DbIdValidator from "../../middleware/validateDbId";

export const watchlistRouter = Router();
// watchlistRouter.use(DbIdValidator);
watchlistRouter.get(`/`, getWatchList);
// watchlistRouter.post(`/`, createWatchList);
watchlistRouter.get(`/update`, addSymbolToWatchList);
