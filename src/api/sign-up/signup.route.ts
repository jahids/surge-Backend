import { Router } from "express";
import { signupController } from "./signup.controller";

export const signupRouter = Router();

signupRouter.post(`/user`, signupController);
