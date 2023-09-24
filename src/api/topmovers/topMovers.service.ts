
import getAlpacaTradeInstance from "../../utils/TradeSdk";



export const getMovers = async (top: string) => {
    const alpacaTradeInstance = getAlpacaTradeInstance();
    const { data } = await alpacaTradeInstance.get(
        `/v1beta1/screener/stocks/movers?top=${top}`,
    );
    return data;
};
