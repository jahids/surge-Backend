import { signupRouter } from "../api/sign-up/signup.route";
import { otpRouter } from "../api/otp/opt.routes";
import { Router, Request, Response } from "express";
import { getAllCountries } from "../api/countries/countries.ctrl";
import { createAccount } from "../api/accounts/account.controller";
import { accountRouter } from "../api/accounts/account.routes";
import { newsRouter } from "../api/news/news.route";

const indexRouter = Router();

indexRouter.get(`/test`, (req: Request, res: Response) => {
    res.status(200).send(`api home`);
});
indexRouter.post(`/test`, (req: Request, res: Response) => {
    res.status(200).json(req.body);
});

//public routes
indexRouter.get("/countries", getAllCountries);
// news route
indexRouter.use("/news", newsRouter);

indexRouter.use("/otp", otpRouter);
indexRouter.use("/signup", signupRouter);

//private routes
indexRouter.use("/accounts", accountRouter);

export default indexRouter;
