import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        alpaca_id: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;

export const getUserByEmail = async (email: string) => {
    try {
        const user = await userModel.findOne({ email: email }).exec();
        return user;
    } catch (error) {
        throw new Error("failed to get user from db");
    }
};
