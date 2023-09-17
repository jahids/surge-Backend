import axios from "axios";
import { getAlpacaAuth } from "./generic.utils";

const ALPACA_BASE_URL = "https://broker-api.sandbox.alpaca.markets";

const AlpacaInstance = axios.create({
    baseURL: ALPACA_BASE_URL,
    withCredentials: true,
});

export const getAlpacaInstance = () => {
    const auth = getAlpacaAuth();
    const instance = axios.create({
        baseURL: ALPACA_BASE_URL,
        headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: `Basic ${auth}`,
        },
    });

    return instance;
};

export default AlpacaInstance;
