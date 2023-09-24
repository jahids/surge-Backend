import { Router } from "express";
import {
    addFundFromAch,
    createAchRelationship,
    deleteAchRelationship,
    findAchRelationship,
    fundHistory,
} from "./ach.controller";

export const achRouter = Router();

achRouter.post(`/`, createAchRelationship);
achRouter.get(`/`, findAchRelationship);
achRouter.delete("/", deleteAchRelationship);
achRouter.post("/add-fund", addFundFromAch);
achRouter.get("/fund-history", fundHistory);
