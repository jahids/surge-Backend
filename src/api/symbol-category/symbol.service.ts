import FinnhubInstance from "../../utils/FinnhubInstance";
import yahooFinance from "yahoo-finance2";
import { IFinnhubSymbol } from "../../types/interfaces/IFinnhub";
export const getFinnhubSymbol = async (
    symbol: string = "TSLA",
): Promise<IFinnhubSymbol> => {
    const { data } = await FinnhubInstance.get(
        `/stock/profile2?symbol=${symbol}`,
    );
    return data;
};

export const getYahooSymbol = async (symbol: string = "TSLA") => {
    const res = await yahooFinance.quoteSummary(symbol);
    return res;
};

export const yahooSymbolProfile = async (symbol: string = "TSLA") => {
    const { summaryProfile, quoteType } = await yahooFinance.quoteSummary(
        symbol,
        {
            modules: ["summaryProfile", "quoteType"],
        },
    );
    // console.log(await yahooFinance.search("TSLA"));
    if (!summaryProfile || !quoteType) {
        return null;
    }
    const { website, industry, sector, longBusinessSummary } = summaryProfile;
    const { longName } = quoteType;

    return {
        weburl: website,
        industry,
        sector,
        name: longName,
        description: longBusinessSummary,
    };
};

export const getCombinedSymbol = async (symbol: string) => {
    const finnhub = await getFinnhubSymbol(symbol);
    const yahoo = await yahooSymbolProfile(symbol);

    return { finnhub, yahoo };
};
