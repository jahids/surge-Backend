import { getAlpacaInstance } from "../../../utils/AlpacaInstance";
import {
    IBankRelationship,
    IPlaidAch,
} from "../../../types/interfaces/IBankRelationship";
import userModel, {
    getUserByEmail,
    updateAch,
} from "../../../models/user.model";
import { getClientById } from "../../../services/Broker.service";
import { NumbersACH } from "plaid";

const BrokerInstance = getAlpacaInstance();

export const createRelation = async (
    accountId: string,
    email: string,
    bank_name: string,
    accountData: NumbersACH,
) => {
    //find db user & check realtionship status
    const dbUser = await getUserByEmail(email);
    if (!dbUser?.email) {
        //user doesn't exist
        // return res
        //     .status(403)
        //     .json(ApiError(`No user found with associated Email!`));
        throw new Error(`user doesn't exist.`);
    }
    //max allowed relationship at once
    if (dbUser?.ach) {
        //already have realtionship
        throw new Error(`Only one relationship allowed.`);
    }

    const alpacaUser: any = await getClientById(accountId);

    const {
        identity: { given_name, family_name },
    } = alpacaUser;
    const fullName = given_name + " " + family_name;
    const bankObject: IBankRelationship = {
        account_owner_name: fullName,
        bank_account_type: "CHECKING",
        bank_routing_number: accountData.routing,
        bank_account_number: accountData.account,
        nickname: bank_name,
    };

    const { data } = await BrokerInstance.post(
        `/v1/accounts/${accountId}/ach_relationships`,
        JSON.stringify(bankObject),
    );

    const result = await updateAch(email, data.id);

    return data;
};
// export const createRelation = async (
//     accountId: string,
//     accountData: IBankRelationship,
// ) => {
//     const { data } = await BrokerInstance.post(
//         `/v1/accounts/${accountId}/ach_relationships`,
//         JSON.stringify(accountData),
//     );
//     return data;
// };

export const getUserAchRelationship = async (id: string) => {
    const { data } = await BrokerInstance.get(
        `/v1/accounts/${id}/ach_relationships`,
    );
    return data;
};

export const removeAchRelation = async (accountId: string) => {
    const achList: any[] = await getUserAchRelationship(accountId);
    if (!achList.length) {
        throw Error("no ach relation exist");
    }
    const ach = achList.find((v) => {
        return v.account_id == accountId;
    });
    if (!ach) {
        return null;
    }
    const { data } = await BrokerInstance.delete(
        `/v1/accounts/${accountId}/ach_relationships/${ach?.id}`,
    );
    return data;
};
export const addFundToAccount = async (
    accountId: string,
    relationId: string,
    amount: number,
) => {
    const fundTransfer = {
        transfer_type: "ach",
        relationship_id: relationId,
        amount: amount,
        direction: "INCOMING",
    };

    const { data } = await BrokerInstance.post(
        `/v1/accounts/${accountId}/transfers`,
        JSON.stringify(fundTransfer),
    );
    return data;
};
export const accountFundHistory = async (accountId: string) => {
    const { data } = await BrokerInstance.get(
        `/v1/accounts/${accountId}/transfers`,
    );
    return data;
};
