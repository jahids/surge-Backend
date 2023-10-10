import mongoose, { Types } from "mongoose";
import { getYYYYMMDD } from "../utils/generic.utils";

interface IPortfolioStatValue {
    date: Date;
    value: number;
}

export interface IPortfolioStats {
    user_id: Types.ObjectId;
    values: IPortfolioStatValue[];
}

const portfolioSchema = new mongoose.Schema<IPortfolioStats>(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        values: [
            {
                _id: false,
                date: Date,
                value: Number,
            },
        ],
    },
    { _id: false },
);

const portfolioModel = mongoose.model<IPortfolioStats>(
    "portfolio_stat",
    portfolioSchema,
);

export async function getPortfolioStatsById(userId: string | Types.ObjectId) {
    const result = await portfolioModel.findOne({ user_id: userId }).exec();
    return result;
}

export async function addNewPortfolioStats(
    userId: string | Types.ObjectId,
    data: IPortfolioStatValue,
) {
    return portfolioModel.updateOne(
        { user_id: userId },
        {
            $push: {
                values: data,
            },
        },
        {
            upsert: true,
        },
    );
}
