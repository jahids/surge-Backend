// import axios from "axios";
// import fs from "node:fs";
const fs = require("fs");
const { default: axios } = require("axios");
const _path_ = `./data.st.json`;
function readJson(fileLoc) {
    const data = fs.readFileSync(fileLoc, { encoding: "utf-8" });
    return JSON.parse(data);
}

const yahooCall = async () => {
    const symbolList = `AAPL,AMZN,CL=F,ES=F,GOOG,META,NFLX,NIO,NQ=F,RIVN,RTY=F,TSLA,YM=F`;
    const crumb = `YjKUSytVvpc`;
    const dt = `
    https://query1.finance.yahoo.com/v7/finance/quote?&symbols=${symbolList}&fields=currency,exchangeTimezoneName,exchangeTimezoneShortName,gmtOffSetMilliseconds,regularMarketChange,regularMarketChangePercent,regularMarketPrice,regularMarketTime,preMarketTime,postMarketTime,extendedMarketTime&crumb=${crumb}&formatted=false&region=US&lang=en-US`;
    try {
        const { data } = await axios.get(dt);
        return data;
    } catch (error) {
        console.log(`error : `, error.message);
        return {};
    }
};

const main = async () => {
    (() => {
        console.clear();
        console.log(`Last Run : ${new Date().toLocaleTimeString()}`);
    })();
    const result = await yahooCall();
    console.log(result);
    // const data = readJson(_path_);
    // const limit = 10;
    // const start = 9;
    // const item = "TesLa".toUpperCase();

    // let myData = data.filter((v) => v.name.toUpperCase().includes(item));

    // console.log(myData);
};

main();
