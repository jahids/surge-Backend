// export const createAlpacaAccount = async (accountData: any, ip: string) => {
//     const AlpacaInstance = getAlpacaInstance();

import getAlpacaTradeInstance from "../../utils/TradeSdk";

export const getallnews = async () => {
    const alpacaTradeInstance = getAlpacaTradeInstance();
    const { data } = await alpacaTradeInstance.get(`/v1beta1/news`);
    return data;
};

export const getSpecificNews = async (symbol: string, limit: string) => {
    const alpacaTradeInstance = getAlpacaTradeInstance();
    const { data } = await alpacaTradeInstance.get(
        `/v1beta1/news?symbols=${symbol}&limit=${limit}`,
    );
    return data;
};
