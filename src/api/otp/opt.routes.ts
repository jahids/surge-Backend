import { Router } from "express";
import { createOtp, verifyOtp } from "./otp.controller";

export const otpRouter = Router();

otpRouter.post(`/send`, createOtp);
otpRouter.post(`/verify`, verifyOtp);
