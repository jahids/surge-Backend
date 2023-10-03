import { faker } from "@faker-js/faker";
import mongoose, { Schema, Types, Document } from "mongoose";

const defaultPfp = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro`;

export interface IUserModel {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    alpaca_id: string;
    ach: string;
    bank: string;
    watch_list: Array<string>;
    pfp?: string;
    all_time_invest: number;
    following?: Array<Types.ObjectId>;
    follower?: Array<Types.ObjectId>;
}

const userSchema = new Schema<IUserModel>(
    {
        name: {
            type: String,
            required: false,
            default: faker.person.firstName() + " " + faker.person.lastName(),
        },
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
        pfp: {
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
                default: [],
            },
        ],
        all_time_invest: {
            type: Number,
            default: 0,
        },
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                default: [],
            },
        ],
        follower: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                default: [],
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
export const findUserByDbId = async (id: string) => {
    try {
        const user = await userModel.findOne({ _id: id }).exec();
        return user;
    } catch (error) {
        throw new Error("failed to get user from db");
    }
};
export const getUserByAlpacaId = async (id: string) => {
    try {
        const user = await userModel
            .findOne({ alpaca_id: id })
            .select("-password")
            .exec();
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
export const updateUserName = async (email: string, name: string) => {
    try {
        const user = await userModel
            .findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        name: name,
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

export const updateFollowing = async (
    userEmail: string,
    targetUser: string,
) => {
    const tdp = new mongoose.Types.ObjectId(targetUser);
    const dbUser = await userModel.findOne({ email: userEmail }).exec();
    if (dbUser) {
        const newFollowerList = dbUser.following?.filter(
            (v) => v.toString() != targetUser,
        );
        if (newFollowerList?.length == dbUser.following?.length) {
            newFollowerList?.push(tdp);
        }
        //update following list
        const updated = await userModel
            .findOneAndUpdate(
                { email: userEmail },
                {
                    $set: {
                        following: newFollowerList,
                    },
                },
                {
                    new: true,
                },
            )
            .exec();
        return updated;
    }
    return null;
};

export const allUser = async () => {
    const result = await userModel
        .find({ alpaca_id: { $ne: null } })
        .select(["alpaca_id"])
        .exec();
    return result;
};

export const addInvesment = async (userId: string, amount: number) => {
    const result = await userModel
        .findOneAndUpdate(
            { _id: userId },
            {
                $inc: {
                    all_time_invest: amount,
                },
            },
        )
        .exec();
    return result;
};

export const findTopInvestors = async (limit: number) => {
    const pdf = await userModel
        .aggregate([
            {
                $sort: {
                    all_time_invest: -1,
                },
            },
            {
                $project: {
                    password: 0,
                },
            },
        ])
        .limit(limit);

    return pdf;
};
