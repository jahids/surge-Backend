import axios from "axios";
import { TradeSdk } from "./src/utils/TradeSdk";
import { __latestQuotes__ } from "./src/utils/LatestQuotes";

// {
//     id: 'c1efb631-f837-4076-8ce8-f2ecdc12a85a',
//     class: 'us_equity',
//     exchange: 'NASDAQ',
//     symbol: 'CHRD',
//     name: 'Chord Energy Corporation Common Stock',
//     status: 'active',
//     tradable: true,
//     marginable: true,
//     maintenance_margin_requirement: 30,
//     shortable: true,
//     easy_to_borrow: true,
//     fractionable: true,
//     attributes: []
//  }

const getAsset = async () => {
    const result = await TradeSdk.getAssets({
        status: "active",
    });
    const tradable = result.filter((v: any) => v.tradable);
    const randomIdx = Math.floor(Math.random() * tradable?.length);
    const share = tradable[randomIdx];
    if (share) {
        const quote = await __latestQuotes__(share.symbol);

        share.quote = quote;
        return share;
    }
    // console.log(randomIdx);
    return tradable?.pop() ?? {};
};

const createRandomOrder = async () => {
    const res = await getAsset();
    // console.log(`🔥🔥 `, res);
    const order = await TradeSdk.createOrder({
        symbol: res.symbol, // any valid ticker symbol
        qty: 13,
        side: "buy",
        type: "market",
        time_in_force: "day",
        client_order_id: "this_jakir_order",
    });
};

const orderHistory = async () => {
    const result = await TradeSdk.getOrders({ status: "filled" });
    return result;
};

const sellShare = async (symbol: string) => {
    const result = await TradeSdk.createOrder({
        symbol: symbol, // any valid ticker symbol
        qty: 13,
        // notional: number, // qty or notional required, not both
        side: "sell",
        type: "market",
        time_in_force: "day",
    });
    console.log(result);
};

const main = async () => {
    console.clear();

    // const accountData = await TradeSdk.getAccount();
    // console.log(`account status : ${accountData.status}`);
    // console.log(result.filter((v: any) => v.tradable));

    // // const order = await TradeSdk.getOrders();
    // console.log(order);
    // const newResult = result.filter((v: any) => v.tradable);

    // setTimeout(() => {
    //     TradeSdk.getPositions()
    //         .then((rs: any) => {
    //             console.log(rs);
    //         })
    //         .catch((er: any) => console.log(er));
    // }, 5 * 1000);

    // console.log(result);

    // console.log(await TradeSdk.getPosition("BIAF"));

    // console.log(await getAsset());
    console.log(await orderHistory());

    // await sellShare("ITW");
};

main();

// const options = {
//     method: "GET",
//     url: "https://data.sandbox.alpaca.markets/v1beta1/logos/VXUS",
//     headers: {
//         accept: "image/png",
//         "APCA-API-KEY-ID": "PK0AV0KSFCSJW1GRNLB3",
//         "APCA-API-SECRET-KEY": "xAKFgdtB5tL2vSHz5luVa4YZ43kDIy5e0aFKyl6u",
//     },
// };

// axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error.message);
//     });

// tst();
