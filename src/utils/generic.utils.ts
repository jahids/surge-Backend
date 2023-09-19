export const toBase64 = (str: string) => {
    const encoded = Buffer.from(str).toString("base64");
    return encoded;
};

export const getAlpacaAuth = () => {
    const key = process.env.ALPACA_API_KEY;
    const secret = process.env.ALPACA_API_SECRET;
    if (!key || !secret) {
        throw "alpaca key/secret is missing.check env";
    }
    const buildString = `${key}:${secret}`;
    return toBase64(buildString);
};

// trade auth

// export const getAlphaTradeAuth = () => {
//     const key = process.env.TRADE_API_KEY_ID;
//     const secret = process.env.TRADE_SECRET_KEY;
//     if (!key || !secret) {
//         throw "alpaca Trade key/secret is missing.check env";
//     }
//     const buildString = `${key}:${secret}`;
//     return toBase64(buildString);
// };
