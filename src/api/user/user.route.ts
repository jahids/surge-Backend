import { Router, Request, Response } from "express";
import { getUserById, getTopInvestors } from "./user.controller";

export const userRouter = Router();

userRouter.get(`/me`, getUserById);
userRouter.get(`/top-investors`, getTopInvestors);
userRouter.get(`/:id`, getUserById);
// userRouter.get(`/follow/:whom`, updateUserFollowing);
