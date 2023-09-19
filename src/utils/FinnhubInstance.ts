import axios from "axios";
import { getAlpacaAuth } from "./generic.utils";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

const FinnhubInstance = axios.create({
    baseURL: FINNHUB_BASE_URL,
    headers: {
        "X-Finnhub-Token": process.env.FINNHUB_API_KEY,
    },
});

// export const getFinnhubInstance = () => {
//     const auth = getAlpacaAuth();
//     const instance = axios.create({
//         baseURL: ALPACA_BASE_URL,
//         headers: {
//             "content-type": "application/json",
//             accept: "application/json",
//             Authorization: `Basic ${auth}`,
//         },
//     });

//     return instance;
// };

export default FinnhubInstance;
