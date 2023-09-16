import axios from "axios";

const AlpacaInstance = axios.create({
    baseURL: "https://broker-api.sandbox.alpaca.markets/v1",
    withCredentials: true,
});

export default AlpacaInstance;
