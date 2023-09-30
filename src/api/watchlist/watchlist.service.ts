import userModel, { IUserModel } from "../../models/user.model";
import { BrokerInstance } from "../../utils/AlpacaInstance";

export const createDefaultWatchlist = async (alpacaId: string) => {
    const defaultWatchlistName = "default";
    const payload = {
        name: defaultWatchlistName,
        symbols: [],
    };
    const { data: result } = await BrokerInstance.post(
        `/v1/trading/accounts/${alpacaId}/watchlists`,
        payload,
    );
    return result;
};

export const getUserDbWatchlist = async (dbId: string) => {
    const result: any = await userModel.findOne({ _id: dbId }).exec();

    return result.watch_list || [];
};

export const updateDbWatchlist = async (dbId: string, symbol: string) => {
    const result: any = await userModel.findOne({ _id: dbId }).exec();
    if (!result) {
        throw new Error("no result found!");
    }
    const oldList: any[] = result.watch_list;

    const newList = oldList.filter((v) => v != symbol);
    if (oldList.length == newList.length) {
        newList.push(symbol);
    }
    await userModel
        .findOneAndUpdate(
            { _id: dbId },
            {
                $set: {
                    watch_list: newList,
                },
            },
        )
        .exec();

    return newList;
};

export const addDbWatchlist = async (dbId: string, symbol: string) => {
    const result: any = await userModel
        .findOneAndUpdate(
            { _id: dbId },
            {
                $push: {
                    watch_list: symbol,
                },
            },
        )
        .exec();
    return result?.watch_list || [];
};
