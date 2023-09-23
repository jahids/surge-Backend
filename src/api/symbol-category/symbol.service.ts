import FinnhubInstance from "../../utils/FinnhubInstance";
import yahooFinance from "yahoo-finance2";
import { IFinnhubSymbol } from "../../types/interfaces/IFinnhub";
import axios from "axios";
export const getFinnhubSymbol = async (
    symbol: string = "TSLA",
): Promise<IFinnhubSymbol | any> => {
    try {
        const { data } = await FinnhubInstance.get(
            `/stock/profile2?symbol=${symbol}`,
        );
        return data;
    } catch (error) {
        return {};
    }
};

export const getYahooSymbol = async (symbol: string = "TSLA") => {
    try {
        const res = await yahooFinance.quoteSummary(
            symbol,
            {},
            { validateResult: false },
        );
        return res;
    } catch (error) {
        return {};
    }
};

export const yahooSymbolProfile = async (symbol: string = "TSLA") => {
    const { summaryProfile, quoteType } = await yahooFinance.quoteSummary(
        symbol,
        {
            modules: ["summaryProfile", "quoteType"],
        },
        {
            validateResult: false,
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
    // console.log(`finn =`);
    const yahoo = await yahooSymbolProfile(symbol);
    // console.log(`finn =🎀`);

    return { finnhub, yahoo };
};

const findYahooPrice = async (symbol: string = "AAPL") => {
    try {
        const yprice = await yahooFinance.quote(symbol);
        console.log(yprice);
        return yprice;
    } catch (error) {
        return null;
    }
};

export const findCurrentPrice = async (symbol: string) => {
    // const price = (Math.random() * 100).toPrecision(5);

    try {
        const _prop_ = `Global Quote`;
        const alphaUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VINTAGE_KEY}`;
        const { data } = await axios.get(alphaUrl);

        const quote = data[_prop_];
        const refinedObj: any = {};

        Object.keys(quote).forEach((key) => {
            const newKey = key.split(" ").pop();
            if (newKey) {
                refinedObj[newKey] = quote[key];
            }
        });

        // console.log(refinedObj);

        return refinedObj;
    } catch (error) {
        return null;
    }
};

export const getCombindedPrice = async (symbol: string) => {
    try {
        const [currentPrice, yahooPrice] = await Promise.all([
            findCurrentPrice(symbol),
            findYahooPrice(symbol),
        ]);
        if (currentPrice?.price) {
            return currentPrice;
        }
        if (yahooPrice && yahooPrice["regularMarketPrice"]) {
            const ypr = {
                price: yahooPrice["regularMarketPrice"],
                volume: yahooPrice["regularMarketVolume"],
                yahoo: yahooPrice,
            };
            return ypr;
        }
        // console.log(`🎍🎏🎐🎐`, currentPrice, yahooPrice);
    } catch (error) {
        return {};
    }
};
