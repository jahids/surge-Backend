import mongoose, { Schema, Types, Document } from "mongoose";

export interface IUserModel {
    _id: Types.ObjectId;
    email: string;
    password: string;
    alpaca_id: string;
    ach: string;
    bank: string;
    watch_list: Array<string>;
}

const userSchema = new Schema<IUserModel>(
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
        ach: {
            type: String,
            required: false,
        },
        bank: {
            type: String,
            required: false,
        },
        watch_list: [
            {
                type: String,
            },
        ],
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
export const getUserByAlpacaId = async (id: string) => {
    try {
        const user = await userModel.findOne({ alpaca_id: id }).exec();
        return user;
    } catch (error) {
        throw new Error("failed to get user from db");
    }
};

export const updateAlpacaId = async (email: string, id: string) => {
    try {
        const user = await userModel
            .findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        alpaca_id: id,
                    },
                },
            )
            .exec();
        return user;
    } catch (error) {
        throw new Error("failed to get user from db");
    }
};

export const updateAch = async (email: string, relationId: string) => {
    try {
        const user = await userModel
            .findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        ach: relationId,
                    },
                },
            )
            .exec();
        return { email, relationId };
    } catch (error) {
        throw new Error("failed to get user from db");
    }
};
