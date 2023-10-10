import { Router } from "express";
import { createPlaidTokenLink, exchangeToken } from "./plaid.controller";

export const plaidRouter = Router();
plaidRouter.get("/link_token", createPlaidTokenLink);
plaidRouter.post("/exchange_token", exchangeToken);
