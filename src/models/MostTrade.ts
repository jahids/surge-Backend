import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Order document
interface IOrder extends Document {
    symbol: string;
    quantity: number;
    price: number;
}

// Define the schema for the Order model
const OrderSchema: Schema = new Schema({
    symbol: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
});

interface ITradedSymbol {
    symbol: string;
    price: number;
    quantity: number;
    name: string;
    logo: string;
    pc?: number | string;
}

// Create a model for the Order collection
const symbolStatsModel = mongoose.model<IOrder>("symbol_stat", OrderSchema);

// Function to increase the count for a given symbol

async function increaseSymbolStats(
    symbol: string,
    quantity: number,
    price: number,
): Promise<IOrder | null> {
    // Find the order document by symbol
    const order = await symbolStatsModel
        .findOneAndUpdate<IOrder>(
            { symbol: symbol },
            {
                $inc: {
                    quantity: quantity,
                    price: price,
                },
            },
            {
                upsert: true,
            },
        )
        .exec();

    return order;
}

async function topTradedSymbol(limit: number): Promise<ITradedSymbol[] | null> {
    const result = await symbolStatsModel.aggregate([
        {
            $match: {
                $or: [
                    { fieldName: { $exists: false } }, // Field does not exist
                    { fieldName: { $ne: null } }, // Field is not null
                    { fieldName: { $ne: "" } }, // Field is not an empty string
                ],
            },
        },
        {
            $sort: { quantity: -1 },
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: "symbols",
                localField: "symbol",
                foreignField: "symbol",
                as: "symbolData",
            },
        },
        {
            $project: {
                symbol: 1,
                quantity: 1,
                price: 1,
                name: {
                    $first: "$symbolData.name",
                },
                logo: {
                    $first: "$symbolData.logo",
                },
            },
        },
    ]);
    return result;
}

async function getTotalPriceQuantity() {
    const result = await symbolStatsModel.aggregate([
        {
            $group: {
                _id: null,
                totalQuantity: { $sum: "$quantity" },
                totalPrice: { $sum: "$price" },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);
    return result.pop();
}

export {
    symbolStatsModel,
    IOrder,
    increaseSymbolStats,
    topTradedSymbol,
    getTotalPriceQuantity,
};
