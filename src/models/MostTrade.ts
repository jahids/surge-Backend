import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Order document
interface IOrder extends Document {
    symbol: string;
    count: number;
}

// Define the schema for the Order model
const OrderSchema: Schema = new Schema({
    symbol: { type: String, required: true },
    count: { type: Number, default: 0 },
});

// Create a model for the Order collection
const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

// Function to increase the count for a given symbol
// Function to increase the count for a given symbol
async function increaseCountByOne(symbol: string): Promise<IOrder> {
    // Find the order document by symbol
    let order = await OrderModel.findOne({ symbol });

    if (!order) {
        // If symbol is not found, create a new document with count set to 1
        order = new OrderModel({ symbol, count: 1 });
    } else {
        // If symbol is found, increment the count by one
        order.count += 1;
    }

    // Save the document
    await order.save();
    return order;
}

export { OrderModel, IOrder, increaseCountByOne };
