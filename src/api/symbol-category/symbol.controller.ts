import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import {
    getCombinedSymbol,
    findCurrentPrice,
    getCombindedPrice,
} from "./symbol.service";
import { ApiSuccess } from "../../utils/ApiSuccess";
import {
    ISymbolModel,
    createSymbol,
    distinctCategory,
    distinctSymbol,
    findSymbol,
    particularCategorySymbols,
} from "../../models/symbol.model";
const sanitizeSymbol = (input: string): string => {
    const match = input.match(/[A-Z]+/);
    return match ? match[0] : "";
};
export async function getSymbolInfo(req: Request, res: Response) {
    try {
        const { name } = req.query;
        if (!name || typeof name != "string") {
            return res.status(400).json(ApiError("symbol name not found!"));
        }

        const refinedSymbol = sanitizeSymbol(name);

        const dbResult = await findSymbol(refinedSymbol);

        const price = await getCombindedPrice(refinedSymbol);
        if (dbResult && dbResult.symbol && dbResult.logo) {
            return res
                .status(200)
                .json({ ...dbResult.toObject(), price: price });
        }
        // console.log(`name=`, name);
        // const price = await findCurrentPrice(name);

        const { finnhub, yahoo } = await getCombinedSymbol(refinedSymbol);

        // console.log(`yahoo : `, yahoo);

        if (finnhub?.weburl && yahoo) {
            yahoo.weburl = finnhub.weburl;
        }

        //create symbol db object
        const finalObj: ISymbolModel = {
            symbol: finnhub?.ticker ?? name,
            name: finnhub.name ?? yahoo?.name,
            description: yahoo?.description ?? "",
            weburl: finnhub?.weburl ?? "",
            logo: finnhub.logo ?? "",
            industry: yahoo?.industry ?? finnhub.finnhubIndustry,
            ysector: yahoo?.industry ?? finnhub.finnhubIndustry,
        };
        if (yahoo?.sector) {
            finalObj.sector = [yahoo.sector];
        }
        if (finnhub.ipo) {
            finalObj.ipo = new Date(finnhub.ipo);
        }

        const dbObj = await createSymbol(finalObj);

        // console.log(dbObj);

        return res.status(200).json(ApiSuccess({ ...finalObj, price: price }));
    } catch (error) {
        // console.log(`e🥼🖼🎞🎎`, error);
        return res.status(500).send(ApiError((error as Error).message + "!"));
    }
}

export async function getCategories(req: Request, res: Response) {
    try {
        const { name } = req.query;
        let result = null;
        if (name) {
            result = await particularCategorySymbols(name.toString());
            return res.status(200).json(ApiSuccess(result));
        }
        result = await distinctCategory();
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message));
    }
}

// export async function getSymbols(req: Request, res: Response) {
//     try {
//         const { category } = req.query;
//         if(!category){

//         }
//         const result = await particularCategorySymbols(category?.toString());
//         return res.status(200).json(ApiSuccess(result));
//     } catch (error) {
//         return res.status(500).send(ApiError((error as Error).message));
//     }
// }

export async function getCategoryNameList(req: Request, res: Response) {
    try {
        const { limit } = req.query;
        let finalLimit = limit || 0;
        if (!limit) {
            finalLimit = 15;
        } else {
            finalLimit = Number(limit.toString());
        }
        const result = await distinctCategory(finalLimit);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message));
    }
}

export async function currentPrice(req: Request, res: Response) {
    try {
        console.log("dest");
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message));
    }
}
