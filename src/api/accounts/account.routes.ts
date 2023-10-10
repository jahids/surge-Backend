import { Router } from "express";
import {
    allAccounts,
    createAccount,
    getCachedAccount,
    singleAccounts,
    singleAccountsByDbId,
} from "./account.controller";
import { getSingleAccount } from "./account.service";

export const accountRouter = Router();

accountRouter.get("/all", allAccounts); //get all the
accountRouter.get(`/cached/:dbId`, getCachedAccount);
accountRouter.get(`/combined/:dbId`, singleAccountsByDbId);
accountRouter.get("/", singleAccounts); //get a single accounts
accountRouter.get("/:accountId", singleAccounts); //get a single accounts
accountRouter.post(`/`, createAccount); //create a single account
