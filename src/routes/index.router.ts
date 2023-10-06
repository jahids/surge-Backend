import { signupRouter } from "../api/sign-up/signup.route";
import { otpRouter } from "../api/otp/opt.routes";
import { Router, Request, Response } from "express";
import { getAllCountries } from "../api/countries/countries.ctrl";
import { createAccount } from "../api/accounts/account.controller";
import { accountRouter } from "../api/accounts/account.routes";
import { newsRouter } from "../api/news/news.route";
import { StockRouter } from "../api/assets/assets.route";
import { symbolRouter } from "../api/symbol-category/symbol.router";
import {
    getCategories,
    getCategoryNameList,
} from "../api/symbol-category/symbol.controller";
import { moversRouter } from "../api/topmovers/topMovers.route";
import { signin, signout } from "../api/sign-up/signup.controller";
import { achRouter } from "../api/fund/ach/ach.routes";
import { AuthMiddleware } from "../middleware/auth-middleware";
import { tradeOrderRouter } from "../api/trade-order/trade.order.route";
import { ApiSuccess } from "../utils/ApiSuccess";
import { plaidRouter } from "../api/plaid/plaid.route";
import { historicalRoute } from "../api/historicaldata/historicaldata.route";
import { socialRouter } from "../api/social/social.route";
import { userRouter } from "../api/user/user.route";
import { portfolioRouter } from "../api/portfolio/portfolio.routes";
import { watchlistRouter } from "../api/watchlist/watchlist.router";
import { surgeStatsRouter } from "../api/surge-stats/surge_routes";

import { TradeSdk } from "../utils/TradeSdk";
import { portfolioValueJobRunner } from "../services/PortfolioStats.service";
import { miscellaneousRouter } from "../api/miscellaneous/miscellaneous.routes";
import { notificationRouter } from "../api/notification/notification.routes";

const indexRouter = Router();

indexRouter.get(`/test`, async (req: Request, res: Response) => {
    // const bar = await TradeSdk.getLatestBar("AAPL");

    const quote = await TradeSdk.getLatestQuote("AAPL");
    res.status(200).json({ result: "api test get", quote });
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
// historical data
indexRouter.use("/history", historicalRoute);

indexRouter.use("/otp", otpRouter);
indexRouter.use("/signup", signupRouter);
indexRouter.use("/signin", signin);
indexRouter.use("/signout", signout);

//🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐 private routes

indexRouter.use(AuthMiddleware);

//

indexRouter.use("/plaid", plaidRouter);
// news route
indexRouter.use("/news", newsRouter);
//assets or stock router
// indexRouter.use("/stock", StockRouter);

//     🧲🧰🧰🧲🧲🧲🧲🧲🏮🏮    miscellaneous   🔦🏮🏮🏮🏮🏮📔🏮🏮

indexRouter.use("/categories", getCategories);
indexRouter.use("/categories-name", getCategoryNameList);

indexRouter.use("/accounts", accountRouter);
indexRouter.use("/ach", achRouter);

//assets or stock router
indexRouter.use("/stock", StockRouter);
//get symbol and info
indexRouter.use(`/symbol`, symbolRouter);
//portfolio
indexRouter.use(`/portfolio`, portfolioRouter);
// order
indexRouter.use(`/order`, tradeOrderRouter);
//user
indexRouter.use(`/user`, userRouter);
indexRouter.use(`/watchlist`, watchlistRouter);

//social
indexRouter.use(`/social`, socialRouter);
// top shares in surge
indexRouter.use(`/surge-stats`, surgeStatsRouter);
//notification router
indexRouter.use("/notification", notificationRouter);

indexRouter.get(`/movers-stats/:symbol`, (req: Request, res: Response) => {
    res.status(200).json(
        ApiSuccess({ change: (Math.random() * 100).toPrecision(2) }),
    );
});
indexRouter.use(`/others`, miscellaneousRouter);
//cron job 1
portfolioValueJobRunner();
export default indexRouter;
