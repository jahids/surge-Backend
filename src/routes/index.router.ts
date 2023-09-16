import { signupRouter } from "../api/sign-up/signup.route";
import { otpRouter } from "../api/otp/opt.routes";
import { Router, Request, Response } from "express";
import { getAllCountries } from "../api/countries/countries.ctrl";

const indexRouter = Router();

indexRouter.get(`/test`, (req: Request, res: Response) => {
    res.status(200).send(`api home`);
});
indexRouter.post(`/test`, (req: Request, res: Response) => {
    res.status(200).json(req.body);
});

//public routes
indexRouter.get("/countries", getAllCountries);

indexRouter.use("/otp", otpRouter);
indexRouter.use("/signup", signupRouter);

//private routes

export default indexRouter;
