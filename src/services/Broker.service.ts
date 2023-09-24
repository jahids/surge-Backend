import { IBankRelationship } from "../types/interfaces/IBankRelationship";
import { getAlpacaInstance } from "../utils/AlpacaInstance";

const BrokerInstance = getAlpacaInstance();

export const getClientById = async (id: string) => {
    const { data } = await BrokerInstance.get(`/v1/accounts/${id}`);
    return data;
};
