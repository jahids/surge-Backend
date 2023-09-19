import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { getCombinedSymbol } from "./symbol.service";
import { ApiSuccess } from "../../utils/ApiSuccess";
import {
    ISymbolModel,
    createSymbol,
    distinctSymbol,
    findSymbol,
} from "../../models/symbol.model";

export async function getSymbolInfo(req: Request, res: Response) {
    try {
        const { name } = req.query;
        if (!name || typeof name != "string") {
            return res.status(400).json(ApiError("symbol name not found!"));
        }

        const dbResult = await findSymbol(name);

        if (dbResult && dbResult.symbol) {
            return res.status(200).json(dbResult);
        }

        const { finnhub, yahoo } = await getCombinedSymbol(name);

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

        return res.status(200).json(ApiSuccess(finalObj));
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message + "!"));
    }
}

export async function getCategories(req: Request, res: Response) {
    try {
        const result = await distinctSymbol();
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message));
    }
}
