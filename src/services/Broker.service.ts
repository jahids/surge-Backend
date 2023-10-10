import { throws } from "assert";
import { IBankRelationship } from "../types/interfaces/IBankRelationship";
import { getAlpacaInstance } from "../utils/AlpacaInstance";
import { __userCache__, cacheUser, getCachedUser } from "../utils/cacheManger";
import nodeCorn from "node-cron";

const BrokerInstance = getAlpacaInstance();

export const getClientById = async (id: string) => {
    if (!id) {
        return null;
    }
    const { data } = await BrokerInstance.get(`/v1/accounts/${id}`);
    return data;
};
export const getAllClients = async () => {
    const result = getCachedUser("all");
    if (result) {
        console.log(`sending cached result `);
        return result;
    }
    const { data } = await BrokerInstance.get(
        `/v1/accounts?entities=contact%2Cidentity`,
    );
    __userCache__.set("all", data, 60);
    // console.log(`data=`, data);
    return data;
};
