import { Request, Response } from "express";
import { TradeSdk } from "../../utils/TradeSdk";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import { __symbolCache__ } from "../../utils/cacheManger";
import { BrokerInstance, getAlpacaInstance } from "../../utils/AlpacaInstance";

let epicData: any = null;

export const getAllStock = async (req: Request, res: Response) => {
    try {
        const { limit, start, item } = req.query;
        const finalLimit = Number(limit)
            ? Number(limit)
            : Number.MAX_SAFE_INTEGER;
        const finalStart = Number(start) ? Number(start) : 0;

        let Allstock: any = null;
        if (!epicData) {
            Allstock = await TradeSdk.getAssets({
                status: "active",
            });

            Allstock.sort((a: any, b: any) => {
                if (a.symbol < b.symbol) {
                    return -1;
                }
                if (a.symbol > b.symbol) {
                    return 1;
                }
                return 0;
            });

            // for(let i=0;i<10;i++){
            //     console.log(`i=${i}   -> ${Allstock[i].}`)
            // }
            const keywords = [
                "ETF",
                "ENF",
                "FUND",
                "WARRANT",
                "Redeemable",
                "Depository",
            ];

            const data = Allstock.filter((v: any) => {
                __symbolCache__.set(v.symbol, v);

                const test = !keywords.some((keyword) =>
                    v.name.toUpperCase().includes(keyword.toUpperCase()),
                );

                return (
                    test &&
                    v.status == "active" &&
                    v.tradable == true &&
                    v.easy_to_borrow == true &&
                    v.class != "crypto"
                );
            });
            epicData = data;
        }

        // console.log(
        //     `final limit : ${finalLimit}   start : ${finalStart} --> item = ${item}`,
        // );
        let finalData = epicData;

        if (item) {
            const query = item.toString().toUpperCase();

            finalData = epicData.filter((v: any) =>
                v.name.toUpperCase().includes(query),
            );
            if (finalData.length == 0) {
                finalData = epicData;
            }
        }
        finalData = finalData.slice(finalStart, finalLimit);
        return res.status(200).json(ApiSuccess(finalData, epicData?.length));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
export const getCachedAsset = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json(ApiError("asset name required"));
        }
        const result = __symbolCache__.get(name?.toString());

        if (result) {
            return res.status(200).json(ApiSuccess(result));
        }
        //get from api and set in

        const { data } = await BrokerInstance.get(`/v1/assets/${name}`);
        if (data.symbol) {
            __symbolCache__.set(data.symbol, data);
        }

        return res.status(200).json(ApiSuccess(data));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const buyStock = async (req: Request, res: Response) => {
    const { symboldata, quantity } = req.body;
    try {
        const order = await TradeSdk.createOrder({
            symbol: symboldata,
            qty: quantity,
            side: "buy",
            type: "market",
            time_in_force: "day",
            client_order_id: Math.random(),
        });
        return res.status(200).json(ApiSuccess(order));
    } catch (error) {
        console.log(error);
        return res.status(500).json(ApiError((error as Error).message));
    }
};

export const SellStock = async (req: Request, res: Response) => {
    const { symboldata, quantity } = req.body;
    try {
        const order = await TradeSdk.createOrder({
            symbol: symboldata,
            qty: quantity,
            side: "sell",
            type: "market",
            time_in_force: "day",
            client_order_id: Math.random(),
        });

        console.log("error order", order);
        return res.status(200).json(ApiSuccess(order));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
// export const position = async (req: Request, res: Response) => {

//     try {
//        const postionapiCall = TradeSdk.getPositions()
//         return res.status(200).json(ApiSuccess(postionapiCall));
//     } catch (error) {
//         return res.status(500).json(ApiError((error as Error).message));
//     }
// };
