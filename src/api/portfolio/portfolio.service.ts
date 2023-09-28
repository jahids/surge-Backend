import { BrokerInstance } from "../../utils/AlpacaInstance";
import {
    IAssetOpenPosition,
    IUserMargin,
} from "../../types/interfaces/interfaces.common";
import { __positionCache__ } from "../../utils/cacheManger";

export const UserPortfolio = async (userId: string) => {
    const { data: positions } = await BrokerInstance.get(
        `/v1/trading/accounts/${userId}/positions`,
    );
};

interface IReduceResult {
    cost_basis: number;
    qty: number;
    market_value: number;
    unrealized_pl: number;
    unrealized_plpc: number;
}

export const UserPositions = async (
    userId: string,
): Promise<IAssetOpenPosition[]> => {
    // const oldData: IAssetOpenPosition[] | undefined =
    //     __positionCache__.get(userId);
    // if (oldData) {
    //     return oldData;
    // }
    const { data: positions } = await BrokerInstance.get(
        `/v1/trading/accounts/${userId}/positions`,
    );
    // __positionCache__.set(userId, positions);
    return positions;
};

export const UserTradeActivity = async (userId: string) => {
    const { data } = await BrokerInstance.get(
        `/v1/accounts/activities?account_id=${userId}&direction=desc&page_size=100&category=trade_activity`,
    );
    return data;
};

export const UserRawActivity = async (userId: string) => {
    const { data } = await BrokerInstance.get(
        `/v1/trading/accounts/${userId}/account`,
    );
    return data as IUserMargin;
};

export const caclulatePositionValues = async (userId: string) => {
    const data: IAssetOpenPosition[] = await UserPositions(userId);

    const resultInit: IReduceResult = {
        cost_basis: 0,
        qty: 0,
        market_value: 0,
        unrealized_pl: 0,
        unrealized_plpc: 0,
    };

    const result: IReduceResult = data.reduce(
        (prv: IReduceResult, cur: IAssetOpenPosition) => {
            const temp = { ...prv };
            temp.cost_basis += Number(cur.cost_basis);
            temp.market_value += Number(cur.market_value);
            temp.qty += Number(cur.qty);
            temp.unrealized_pl += Number(cur.unrealized_pl);
            temp.unrealized_plpc += Number(cur.unrealized_plpc);
            return temp;
        },
        resultInit,
    );

    return result;
};
