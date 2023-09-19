import { Router } from "express";
import { News } from "./news.controller";

export const newsRouter = Router();

newsRouter.get("/", News);
