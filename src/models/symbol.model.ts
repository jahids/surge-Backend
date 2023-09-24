import { tr } from "@faker-js/faker";
import mongoose from "mongoose";

export interface ISymbolModel {
    symbol?: string;
    ipo?: Date;
    name?: string;
    description?: string;
    weburl?: string;
    logo?: string;
    sector?: string[];
    industry?: string;
    ysector?: string; // for the shake of flexibility
}

const symbolSchema = new mongoose.Schema<ISymbolModel>(
    {
        symbol: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        ipo: {
            type: Date,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        weburl: String,
        logo: {
            type: String,
            required: false,
        },
        sector: {
            type: Array,

            default: [],
        },
        industry: String,
        ysector: String,
    },
    {
        timestamps: true,
    },
);

const symbolModel = mongoose.model<ISymbolModel>("symbol", symbolSchema);

export async function findSymbol(symbol: string) {
    const dbOtp = await symbolModel.findOne({ symbol: symbol }).exec();
    return dbOtp;
}

export async function setOrUpdateSymbol(symbol: string, obj: ISymbolModel) {
    const dbOtp = await symbolModel.findOneAndUpdate(
        { symbol: symbol },
        { ...obj },
        { upsert: true },
    );
    return dbOtp;
}

export async function createSymbol(symbolObj: ISymbolModel) {
    try {
        const result = await symbolModel.create(symbolObj);
        return result;
    } catch (error) {
        return {};
    }
}

export async function deleteSymbol(symbol: string) {
    const result = await symbolModel.deleteMany({ symbol: symbol });
    return result;
}
export async function distinctSymbol() {
    const result = await symbolModel.aggregate([
        {
            $group: {
                _id: "$ysector",
                symbol_ids: { $addToSet: "$_id" },
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                symbols: "$symbol_ids",
            },
        },
    ]);
    return result;
}
