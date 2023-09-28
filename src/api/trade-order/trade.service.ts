import { getAlpacaInstance } from "../../utils/AlpacaInstance";
const BrokerInstance = getAlpacaInstance();
export const createOrder = async (accountId: string, orderForm: any) => {
    //place order
    let orderObj = null;
    if (orderForm?.type == "market") {
        orderObj = toMarketOrder(orderForm);
    } else if (orderForm?.type == "limit") {
        orderObj = toLimitOrder(orderForm);
    }
    if (orderObj) {
        const { data } = await BrokerInstance.post(
            `/v1/trading/accounts/${accountId}/orders`,
            orderObj,
        );
        return data;
    }
};

const toLimitOrder = (orderForm: any) => {
    const orderObj = {
        side: "buy",
        type: "limit",
        time_in_force: "day",

        qty: orderForm?.quantity ?? 1,
        symbol: orderForm?.symbol ?? "AAPL",
        limit_price: orderForm?.limitPrice ?? "1",
    };
    return orderObj;
};
const toMarketOrder = (orderForm: any) => {
    const orderObj = {
        side: "buy",
        type: "market",
        time_in_force: "day",
        // commission_bps: "5",
        qty: orderForm?.quantity ?? 1,
        symbol: orderForm?.symbol ?? "AAPL",
    };
    return orderObj;
};

export const OrderList = async (accountId: string) => {
    //get order list
    console.log(accountId);
    const { data } = await BrokerInstance.get(
        `/v1/trading/accounts/${accountId}/orders?status=all`,
    );
    console.log(`data=`, data);
    return data;
};

export const SingleOrderDetails = async (
    accountId: string,
    orderId: string,
) => {
    //place order
    const { data } = await BrokerInstance.get(
        `/v1/trading/accounts/${accountId}/orders/${orderId}`,
    );

    return data;
};

export const sellOrder = async (accountId: string, orderForm: any) => {
    //place order
    const { data } = await BrokerInstance.post(
        `/v1/trading/accounts/${accountId}/orders`,
        orderForm,
    );
    return data;
};
