import axios from "axios";
import getAlpacaTradeInstance from "../../utils/TradeSdk";
import { BrokerInstance } from "../../utils/AlpacaInstance";
import { __topMoversCache__ } from "../../utils/cacheManger";

type RawData = {
    metadata: string;
    last_updated: string;
    top_gainers: Array<{
        ticker: string;
        price: string;
        change_amount: string;
        change_percentage: string;
        volume: string;
    }>;
    top_losers: Array<{
        ticker: string;
        price: string;
        change_amount: string;
        change_percentage: string;
        volume: string;
    }>;
    most_actively_traded: Array<{
        ticker: string;
        price: string;
        change_amount: string;
        change_percentage: string;
        volume: string;
    }>;
};

type DesiredData = {
    gainers: Array<{
        symbol: string;
        percent_change: number;
        change: number;
        price: number;
    }>;
    losers: Array<{
        symbol: string;
        percent_change: number;
        change: number;
        price: number;
    }>;
};

const convertRawToDesired = (rawData: RawData, size: number): DesiredData => {
    const gainers = rawData.top_gainers
        ?.map((gainer) => ({
            symbol: gainer.ticker,
            percent_change: parseFloat(
                gainer.change_percentage.replace("%", ""),
            ),
            change: parseFloat(gainer.change_amount),
            price: parseFloat(gainer.price),
        }))
        .slice(0, size);

    const losers = rawData.top_losers
        ?.map((loser) => ({
            symbol: loser.ticker,
            percent_change: parseFloat(
                loser.change_percentage.replace("%", ""),
            ),
            change: parseFloat(loser.change_amount),
            price: parseFloat(loser.price),
        }))
        .slice(0, size);

    return {
        gainers,
        losers,
    };
};

export const alphavantageMovers = async (size: number): Promise<any> => {
    const oldData: any = __topMoversCache__.get("top");
    let finalData = { ...oldData };
    if (!oldData) {
        const { data } = await axios.get(
            `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VINTAGE_KEY}`,
        );
        finalData = data;
    }

    // console.log(`got Data !`, data);
    if (finalData?.top_gainers?.length) {
        const desiredData = convertRawToDesired(finalData, size);
        return desiredData;
    } else {
        const { data } = await axios.get(
            `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`,
        );
        __topMoversCache__.set("top", data);
        const desiredData = convertRawToDesired(data, size);
        return desiredData;
    }
};

export const getMovers = async (limit: string) => {
    const alpacaTradeInstance = getAlpacaTradeInstance();

    const {
        data: { is_open },
    } = await BrokerInstance.get("v1/clock");

    if (is_open) {
        // console.log(`market open  ; 🔥`);
        const { data } = await alpacaTradeInstance.get(
            `/v1beta1/screener/stocks/movers?top=${limit}`,
        );
        return data;
    } else {
        const data = await alphavantageMovers(Number(limit) || 10);
        return data;
    }
};
/*

 "gainers": [
        {
        "symbol": "AGRI",
        "percent_change": 145.56,
        "change": 2.46,
        "price": 4.15
        }
    ]

    "losers": [
        {
        "symbol": "MTACW",
        "percent_change": -63.07,
        "change": -0.26,
        "price": 0.1502
        }
    ]

*/
/*

"top_gainers": [
        {
            "ticker": "ATEK+",
            "price": "0.1199",
            "change_amount": "0.0699",
            "change_percentage": "139.8%",
            "volume": "38492"
        }
    ]
 "top_losers": [
        {
            "ticker": "NXLIW",
            "price": "0.025",
            "change_amount": "-0.0348",
            "change_percentage": "-58.194%",
            "volume": "797"
        }]

*/
