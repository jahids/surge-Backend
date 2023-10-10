import { Router } from "express";
import { News, specificNews } from "./news.controller";

export const newsRouter = Router();

newsRouter.get("/", News);
newsRouter.get("/:symbol/:limit", specificNews);
