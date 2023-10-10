import NodeCache from "node-cache";
const _life_ = 1 * 60 * 60; // in seconds -> 1 hours
const deleteCheck = 1 * 60; // in seconds -> 1 min

const cacheOptions: NodeCache.Options = {
    stdTTL: _life_,
    checkperiod: deleteCheck,
    useClones: false,
    deleteOnExpire: true,
    maxKeys: -1,
};

// Create separate cache instances for each object type
const orderCache = new NodeCache({ ...cacheOptions, stdTTL: 3 * 60 * 60 });
export const __userCache__ = new NodeCache(cacheOptions);
export const __topMoversCache__ = new NodeCache({ stdTTL: 24 * 60 * 60 });

export const __symbolCache__ = new NodeCache(cacheOptions);
export const __positionCache__ = new NodeCache({
    stdTTL: 60,
    deleteOnExpire: true,
    checkperiod: 59,
});
const productCache = new NodeCache(cacheOptions);

const symbolCache = new NodeCache({ stdTTL: 0 });

export function cacheOrder(order_id: string, order_data_object: any) {
    return orderCache.set(order_id, order_data_object);
}

export function getCachedOrder(order_id: string) {
    return orderCache.get(order_id);
}

export function cacheUser(user_id: string, user_data_object: any) {
    return __userCache__.set(user_id, user_data_object, 600);
}

export function getCachedUser(user_id: string) {
    return __userCache__.get(user_id);
}

export function cacheProduct(product_id: string, product_data_object: any) {
    return productCache.set(product_id, product_data_object, 600);
}

export function getProduct(product_id: string) {
    return productCache.get(product_id);
}

export function cacheSymbol(symbol: string, symbolData: any) {
    return symbolCache.set(symbol, symbolData);
}
export function getCachedSymbol(symbol: string) {
    return symbolCache.get(symbol);
}
