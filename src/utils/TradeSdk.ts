import Alpaca from "@alpacahq/alpaca-trade-api";

import axios from "axios";
import { getAlpacaAuth } from "./generic.utils";

const ALPACA_Trade_Base_URL = "https://data.alpaca.markets";

const options = {
    keyId: process.env.TRADE_API_KEY_ID,
    secretKey: process.env.TRADE_SECRET_KEY,
    paper: true,
};
export const TradeSdk = new Alpaca(options);

// alpacha trade instance
export const getAlpacaTradeInstance = () => {
    const instance = axios.create({
        baseURL: ALPACA_Trade_Base_URL,
        headers: {
            "APCA-API-KEY-ID": process.env.TRADE_API_KEY_ID,
            "APCA-API-SECRET-KEY": process.env.TRADE_SECRET_KEY,
            accept: "application/json",
        },
    });

    return instance;
};

export default getAlpacaTradeInstance;
