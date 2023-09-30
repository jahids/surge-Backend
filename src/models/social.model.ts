import { tr } from "@faker-js/faker";
import mongoose, {
    Types,
    Document,
    SchemaTypes,
    Mongoose,
    Schema,
    mongo,
} from "mongoose";
import { type } from "os";

export interface IComment {
    user_id: Types.ObjectId;
    time: Date;
    text: string;
    links: string[];
}
export interface ISocialOrderDetails {
    order_id: string;
    client_id: string;
    time: Date;
    text: string;
    links: string[];
}

export type orderType = "market" | "limit";

export interface ISocialModel {
    user: Types.ObjectId;
    text: string;
    order_id: string;
    buyer_id: string;
    order_type: orderType;
    buying_price: string | number;
    symbol?: string;
    links: [string];
    like: string[];
    comments?: IComment[];
    order_side: "buy" | "sell";
    _data?: any;
}

const socialSchema = new mongoose.Schema<ISocialModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        text: String,
        symbol: {
            type: String,
            required: false,
            ref: "symbol",
            // refPath: "symbol",
        },
        order_id: {
            type: String,
            required: true,
        },
        buyer_id: {
            type: String,
            required: true,
        },
        order_type: String,
        order_side: String,
        like: [String],
        links: [String],
        comments: [
            {
                user_id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "user",
                },
                time: Date,
                text: String,
                links: [String],
            },
        ],
        _data: Object,
    },
    {
        timestamps: true,
    },
);

const socialModel = mongoose.model(`social`, socialSchema);

export const createSocialPost = async (data: ISocialModel) => {
    const result = await socialModel.create(data);
    return result;
};

export async function PostsByUser(userId: string) {
    // const id = new mongoose.mongo.ObjectId(userId);
    console.log(`user id = ${userId}`);
    const newId = new mongoose.Types.ObjectId(userId);

    const id = mongoose.Types.ObjectId.isValid(newId);

    console.log(`new id =`, newId);
    console.log(`verification : ${id}`);
    // const result = await socialModel.find({ user: id }).populate("user");
    return newId;
}

export async function PostsById(postId: string) {
    // console.log(`user id = ${postId}`);
    const newId = new mongoose.Types.ObjectId(postId);

    // const result2 = await socialModel
    //     .findOne({ _id: newId })
    //     .populate(["user", "comments.user_id", "symbol.symbol"]);

    const result = await socialModel.aggregate([
        {
            $match: {
                _id: {
                    $eq: newId,
                },
            },
        },
        {
            $unwind: { path: "$comments", preserveNullAndEmptyArrays: true },
        },

        // Use $sort to sort the comments by 'time' in descending order (newest first)
        {
            $sort: {
                "comments.time": -1,
            },
        },

        // Group the comments back into an array
        {
            $group: {
                _id: "$_id",
                comments: {
                    $push: "$comments",
                },
                user: { $first: "$user" },
                buyer_id: { $first: "$buyer_id" },
                symbol: { $first: "$symbol" },
                text: { $first: "$text" },
                like: { $first: "$like" },
                order_id: { $first: "$order_id" },
                order_type: { $first: "$order_type" },
                createdAt: { $first: "$createdAt" },
                links: { $first: "$links" },
                _data: { $first: "$_data" },
                // symbol : {$first : "$symbol"},

                // Include other fields you want to keep here
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },

        {
            $lookup: {
                from: "symbols",
                localField: "symbol",
                foreignField: "symbol",
                as: "symbol",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.user_id",
                foreignField: "_id",
                as: "comment_user",
            },
        },
        {
            $project: {
                "user.password": 0,
                "comment_user.password": 0,
            },
        },
    ]);

    return result;
}

export async function PostsByUserId(userId: string) {
    // console.log(`user id = ${userId}`);
    const newId = new mongoose.Types.ObjectId(userId);

    // const result2 = await socialModel
    //     .findOne({ _id: newId })
    //     .populate(["user", "comments.user_id", "symbol.symbol"]);

    const result = await socialModel.aggregate([
        {
            $match: {
                user: {
                    $eq: newId,
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },

        {
            $lookup: {
                from: "symbols",
                localField: "symbol",
                foreignField: "symbol",
                as: "symbol",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.user_id",
                foreignField: "_id",
                as: "comment_user",
            },
        },
        {
            $project: {
                "user.password": 0,
                "comment_user.password": 0,
            },
        },
    ]);

    return result;
}

export async function MultipleUserPosts(userIds: Types.ObjectId[]) {
    const data = [];
    for (let i = 0; i < userIds.length; i++) {
        console.log(`userId = ${userIds[i].toString()}`);
        const tst = await PostsByUserId(userIds[i].toString());
        data.push(tst);
    }
    return data;
}

export async function addCommets(post_id: string, comment: IComment) {
    // const id = new mongoose.Types.ObjectId(post_id);
    const result = await socialModel.findOneAndUpdate(
        { _id: post_id },
        {
            $push: {
                comments: comment,
            },
        },
    );
    return result;
}

export async function updateLike(post_id: string, userId: string) {
    const result = await socialModel.findOne({ _id: post_id }, "like").exec();
    let newResult = null;
    if (result && userId) {
        newResult = result.like.filter((v) => v != userId);
        if (newResult.length == result.like.length) {
            //push
            newResult.push(userId);
        }
        //update the data now
        const updated = await socialModel
            .findOneAndUpdate(
                { _id: post_id },
                {
                    $set: {
                        like: newResult,
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
}
