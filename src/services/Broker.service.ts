import { throws } from "assert";
import { IBankRelationship } from "../types/interfaces/IBankRelationship";
import { getAlpacaInstance } from "../utils/AlpacaInstance";

const BrokerInstance = getAlpacaInstance();

export const getClientById = async (id: string) => {
    if (!id) {
        return null;
    }
    const { data } = await BrokerInstance.get(`/v1/accounts/${id}`);
    return data;
};
export const getAllClients = async () => {
    const { data } = await BrokerInstance.get(
        `/v1/accounts?entities=contact%2Cidentity`,
    );
    // console.log(`data=`, data);
    return data;
};
