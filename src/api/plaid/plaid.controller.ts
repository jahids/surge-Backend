import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { faker } from "@faker-js/faker";
import PlaidInstance from "../../utils/PlaidInstance";

import { AuthGetRequest, CountryCode, NumbersACH, Products } from "plaid";

import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import {
    IBankRelationship,
    IPlaidAch,
} from "../../types/interfaces/IBankRelationship";
import { createRelation } from "../fund/ach/ach.service";

export async function createPlaidTokenLink(req: Request, res: Response) {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    // const clientUserId = user.id;
    // console.log(`cookies=`, req.cookies);
    const plaidRequest = {
        user: {
            // This should correspond to a unique id for the current user.
            client_user_id: faker.string.numeric(10),
        },
        client_name: "Surge",
        products: [Products.Auth],
        language: "en",
        //   webhook: 'https://webhook.example.com',
        redirect_uri: `${process.env.CLIENT_BASE_URL}/success`,
        country_codes: [CountryCode.Us],
    };
    try {
        const createTokenResponse =
            await PlaidInstance.linkTokenCreate(plaidRequest);
        return res.json(createTokenResponse.data);
    } catch (error) {
        // handle error
        console.log(error);
        return res.status(500).json(ApiError((error as Error).message));
    }
}
export async function exchangeToken(req: Request, res: Response) {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    // const clientUserId = user.id;
    const { token, bank_name } = req.body;
    const alpacaId = (req as ICustomRequest).alpaca_id;
    const email = (req as ICustomRequest).user_mail;

    console.log(`token = ${token}`);
    try {
        const {
            data: { access_token },
        } = await PlaidInstance.itemPublicTokenExchange({
            public_token: token,
        });

        console.log(`accessToken =${access_token}`);
        const authRequest: AuthGetRequest = {
            access_token: access_token,
        };

        const {
            data: {
                numbers: { ach },
            },
        } = await PlaidInstance.authGet(authRequest);

        //now create an ACH relationship for the user
        const firstAch: NumbersACH = ach[0];
        const achResult = await createRelation(
            alpacaId,
            email,
            bank_name,
            firstAch,
        );

        return res.json(achResult);
    } catch (error) {
        // handle error
        // console.log(error);
        return res.status(500).json(ApiError((error as Error).message));
    }
}
