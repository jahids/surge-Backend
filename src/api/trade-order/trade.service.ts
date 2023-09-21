import { getAlpacaInstance } from "../../utils/AlpacaInstance";
const BrokerInstance = getAlpacaInstance();
export const createOrder = async (accountId: string, orderForm: any) => {
    //place order
    const { data } = await BrokerInstance.post(
        `/v1/trading/accounts/${accountId}/orders`,
        orderForm,
    );
    return data;
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
