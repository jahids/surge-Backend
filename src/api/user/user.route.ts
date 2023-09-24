import { Router, Request, Response } from "express";
import { getUserById } from "./user.controller";

export const userRouter = Router();

userRouter.get(`/:id`, getUserById);
// userRouter.get(`/follow/:whom`, updateUserFollowing);
