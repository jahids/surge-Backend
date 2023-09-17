import { Router } from "express";
import { signupController, checkUser } from "./signup.controller";

export const signupRouter = Router();

signupRouter.post(`/user`, signupController);
signupRouter.post(`/exist`, checkUser);
