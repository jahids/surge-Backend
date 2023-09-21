import { getAlpacaInstance } from "../../../utils/AlpacaInstance";
import { IBankRelationship } from "../../../types/interfaces/IBankRelationship";

const BrokerInstance = getAlpacaInstance();

export const createRelation = async (
    accountId: string,
    accountData: IBankRelationship,
) => {
    const { data } = await BrokerInstance.post(
        `/v1/accounts/${accountId}/ach_relationships`,
        JSON.stringify(accountData),
    );
    return data;
};

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
