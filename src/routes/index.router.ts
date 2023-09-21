import { signupRouter } from "../api/sign-up/signup.route";
import { otpRouter } from "../api/otp/opt.routes";
import { Router, Request, Response } from "express";
import { getAllCountries } from "../api/countries/countries.ctrl";
import { createAccount } from "../api/accounts/account.controller";
import { accountRouter } from "../api/accounts/account.routes";
import { newsRouter } from "../api/news/news.route";
import { StockRouter } from "../api/assets/assets.route";
import { symbolRouter } from "../api/symbol-category/symbol.router";
import { getCategories } from "../api/symbol-category/symbol.controller";
import { moversRouter } from "../api/topmovers/topMovers.route";
import { signin, signout } from "../api/sign-up/signup.controller";
import { achRouter } from "../api/fund/ach/ach.routes";
import { AuthMiddleware } from "../middleware/auth-middleware";
import { tradeOrderRouter } from "../api/trade-order/trade.order.route";
import { ApiSuccess } from "../utils/ApiSuccess";

const indexRouter = Router();

indexRouter.get(`/test`, (req: Request, res: Response) => {
    res.status(200).send(`api home`);
});

indexRouter.post(`/test`, (req: Request, res: Response) => {
    res.status(200).json(req.body);
});

indexRouter.delete(`/test`, (req: Request, res: Response) => {
    res.sendStatus(204);
});

//public routes
indexRouter.get("/countries", getAllCountries);

//top movers router
indexRouter.use("/movers", moversRouter);

indexRouter.use("/otp", otpRouter);
indexRouter.use("/signup", signupRouter);
indexRouter.use("/signin", signin);
indexRouter.use("/signout", signout);

//🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐 private routes

indexRouter.use(AuthMiddleware);

// news route
indexRouter.use("/news", newsRouter);
//assets or stock router
indexRouter.use("/stock", StockRouter);

//     🧲🧰🧰🧲🧲🧲🧲🧲🏮🏮    miscellaneous   🔦🏮🏮🏮🏮🏮📔🏮🏮

indexRouter.use("/categories", getCategories);

indexRouter.use("/accounts", accountRouter);
indexRouter.use("/ach", achRouter);
//assets or stock router
indexRouter.use("/stock", StockRouter);
//get symbol and info
indexRouter.use(`/symbol`, symbolRouter);

// order
indexRouter.use(`/order`, tradeOrderRouter);

indexRouter.get(`/movers-stats/:symbol`, (req: Request, res: Response) => {
    res.status(200).json(
        ApiSuccess({ change: (Math.random() * 100).toPrecision(2) }),
    );
});

export default indexRouter;
