import { Router, Request, Response } from "express";
import { getUserById } from "./user.controller";

const userRouter = Router();

userRouter.get(`/:id`, getUserById);
