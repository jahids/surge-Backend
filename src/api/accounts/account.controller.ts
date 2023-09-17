import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { toBase64 } from "../../utils/generic.utils";
import {
    createAlpacaAccount,
    getAllAlpacaAccount,
    getSingleAccount,
} from "./account.service";
import { ApiSuccess } from "../../utils/ApiSuccess";

export const createAccount = async (req: Request, res: Response) => {
    try {
        //create account in alpaca
        const acData = await createAlpacaAccount(req.body, req.ip);
        // update db user
        return res
            .status(200)
            .json(ApiSuccess(null, `account successfully created!`));
    } catch (error) {
        console.log(error);
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const allAccounts = async (req: Request, res: Response) => {
    try {
        const acData = await getAllAlpacaAccount();

        return res.status(200).json(ApiSuccess(acData));
        // return res.status(200).json(req.body);
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
export const singleAccounts = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const acData = await getSingleAccount(accountId);

        return res.status(200).json(ApiSuccess(acData));
        // return res.status(200).json(req.body);
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
