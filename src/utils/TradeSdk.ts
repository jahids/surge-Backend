import Alpaca from "@alpacahq/alpaca-trade-api";

const options = {
    keyId: process.env.TRADE_API_KEY_ID,
    secretKey: process.env.TRADE_SECRET_KEY,
    paper: true,
};
export const TradeSdk = new Alpaca(options);
