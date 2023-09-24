import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { toBase64 } from "../../utils/generic.utils";
import {
    createClientAccount,
    getAllAlpacaAccount,
    getSingleAccount,
} from "./account.service";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { updateAlpacaId } from "../../models/user.model";
import { generateJwt, getTokenLife } from "../../middleware/auth-middleware";
import { AxiosError } from "axios";

export const createAccount = async (req: Request, res: Response) => {
    try {
        //create account in alpaca
        console.log(`🔥🎇🎆🔥`, req.body);
        const acData = await createClientAccount(req.body, req.ip);
        //now update the user db with alpaca user id

        const {
            contact: { email_address },
            id,
        } = acData;

        // update db user
        const dbUser = await updateAlpacaId(email_address, id);
        //set http cookie with data
        const signedToken = await generateJwt({ email: email_address, id: id });

        res.cookie("token", signedToken, {
            maxAge: getTokenLife(),
        });

        return res
            .status(200)
            .json(ApiSuccess(null, `account successfully created!`));
    } catch (error) {
        if (error instanceof AxiosError) {
            const err: any = (error as AxiosError).response?.data;

            return res.status(500).json(ApiError(err));
        }
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
        // console.log(`✔✔ `, accountId);
        if (!accountId) {
            return res.json(req.cookies);
        }
        const acData = await getSingleAccount(accountId);

        return res.status(200).json(ApiSuccess(acData));
        // return res.status(200).json(req.body);
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
