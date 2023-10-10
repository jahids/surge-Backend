import { Request, Response } from "express";
import { ApiError } from "../../../utils/ApiError";
import { verifyJwt } from "../../../middleware/auth-middleware";
import userModel, { getUserByEmail } from "../../../models/user.model";
import { IBankRelationship } from "../../../types/interfaces/IBankRelationship";

import {
    addFundToAccount,
    createRelation,
    getUserAchRelationship,
    removeAchRelation,
    accountFundHistory,
} from "./ach.service";

import { ICustomRequest } from "../../../types/interfaces/ICustomRequest";
import { ApiSuccess } from "../../../utils/ApiSuccess";
import { AxiosError } from "axios";
import { getClientById } from "../../../services/Broker.service";

export const createAchRelationship = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;
        const { email, id: alpacaId } = verifyJwt(token);
        const { bank_name, routing_number, account_number } = req.body;
        // return res.json({ ...req.body, cok: verifyJwt(token) });

        //find db user & check realtionship status
        const dbUser = await getUserByEmail(email);
        if (!dbUser?.email) {
            //user doesn't exist
            return res
                .status(403)
                .json(ApiError(`No user found with associated Email!`));
        }
        //max allowed relationship at once
        if (dbUser?.ach) {
            //already have realtionship
            return res
                .status(409)
                .json(ApiError(`Only one relationship allowed.`));
        }

        const alpacaUser: any = await getClientById(alpacaId);
        const {
            identity: { given_name, family_name },
        } = alpacaUser;
        const fullName = given_name + " " + family_name;
        const bankObject: IBankRelationship = {
            account_owner_name: fullName,
            bank_account_type: "CHECKING",
            bank_routing_number: routing_number,
            bank_account_number: account_number,
            nickname: bank_name,
        };
        // console.log(`🎇🎇✨✨`, { ...bankObject, id: alpacaId });
        // const result = await createRelation(alpacaId, bankObject);
        // now update relationship in user db

        return res.status(200).json(ApiSuccess(`Relationship Established!`));
        // return res.status(200).json(ApiSuccess(result));

        //
        /**
            {
                "account_owner_name": "Relaxed Dewdney",
                "bank_account_type": "SAVINGS",
                "bank_account_number": "32131231abc",
                "bank_routing_number": "123103716",
                "nickname": "Bank of America Checking"
            }
         */
    } catch (error) {
        console.log(`🎀`, (error as AxiosError).response?.data);
        return res.status(500).json(ApiError(`${(error as Error).message}`));
    }
};

export const findAchRelationship = async (req: Request, res: Response) => {
    try {
        const alpaca_id = (req as ICustomRequest).alpaca_id;
        const relation = await getUserAchRelationship(alpaca_id);
        return res.status(200).json(ApiSuccess(relation));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const deleteAchRelationship = async (req: Request, res: Response) => {
    try {
        const email = (req as ICustomRequest).user_mail;
        const alpaca_id = (req as ICustomRequest).alpaca_id;

        if (!alpaca_id) {
            return res.status(400).json(ApiError("User Id not found!"));
        }
        // delete
        const result = await removeAchRelation(alpaca_id);

        return res.status(200).json(ApiSuccess(null, "Deleted!"));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const addFundFromAch = async (req: Request, res: Response) => {
    try {
        const email = (req as ICustomRequest).user_mail;
        const alpaca_id = (req as ICustomRequest).alpaca_id;

        const dbUser = await getUserByEmail(email);

        if (!dbUser?.ach) {
            return res.status(401).json(ApiError(`no ach relation found!`));
        }

        const { amount } = req.body;
        const relation_id = dbUser.ach;

        // delete
        const result = await addFundToAccount(alpaca_id, relation_id, amount);

        return res.status(200).json(ApiSuccess(result, `$${amount} added!`));
    } catch (error) {
        // console.log(`error :`, error);
        if (error instanceof AxiosError) {
            return res.status(500).json(ApiError(error.response?.data));
        }
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const fundHistory = async (req: Request, res: Response) => {
    try {
        const email = (req as ICustomRequest).user_mail;
        const alpaca_id = (req as ICustomRequest).alpaca_id;

        // delete
        const result = await accountFundHistory(alpaca_id);

        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
