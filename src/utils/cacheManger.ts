import NodeCache from "node-cache";
const _life_ = 1 * 60 * 1000; // in seconds -> 1 hours
const deleteCheck = 1 * 60; // in seconds -> 1 min

const cacheOptions: NodeCache.Options = {
    stdTTL: _life_,
    checkperiod: deleteCheck,
    useClones: false,
    deleteOnExpire: true,
    maxKeys: -1,
};
export const cacheManger = new NodeCache(cacheOptions);

export const cacheSymbolInfo = (symbol: string, info: any) => {
    // check if it's there
    const symbolInfo: any = cacheManger.get("symbolInfo");
    if (symbolInfo) {
        if (!symbolInfo[symbol]) {
            symbolInfo[symbol] = info;
        }
    }
};

export const cacheAlpacaUser = (userID: string, userObj: any) => {
    const alpacaUser: any = cacheManger.get("alpacaUser");
    if (alpacaUser && !alpacaUser[userID]) {
        alpacaUser[userID] = userObj;
    }
};
