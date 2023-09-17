import { Router } from "express";
import {
    allAccounts,
    createAccount,
    singleAccounts,
} from "./account.controller";
import { getSingleAccount } from "./account.service";

export const accountRouter = Router();

accountRouter.get("/", allAccounts); //get all the accounts
accountRouter.get("/:accountId", singleAccounts); //get a single accounts
accountRouter.post(`/`, createAccount); //create a single account
