import { topTradedSymbol } from "../../models/MostTrade";

export const findTopTradedSymbols = async (limit: number = 3) => {
    const dbResult = await topTradedSymbol(limit);
    return dbResult;
};
