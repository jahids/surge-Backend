import { Router } from "express";
import { getAllMovers } from "./topMovers.Controller";

export const moversRouter = Router();


moversRouter.get("/:top", getAllMovers);
