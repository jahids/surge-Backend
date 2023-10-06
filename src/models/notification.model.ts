import mongoose, { Document, Schema, Types } from "mongoose";

interface IFromUser {
    pfp: string | undefined;
    name: string | undefined;
    dbId: string;
}

export interface INotification {
    user: string;
    type: "follow" | "share_change";
    fromUser: IFromUser;
    marked: boolean;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: String, required: true },
        fromUser: { type: Object, required: true },
        type: { type: String, required: true },
        marked: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const notificationModel = mongoose.model<INotification>(
    "notification",
    NotificationSchema,
);

export const getUnreadNotification = async (dbId: Types.ObjectId | string) => {
    const result = await notificationModel
        .find({
            user: dbId,
            marked: false,
        })
        .sort("-createdAt")
        .exec();

    return result;
};

export const addNotification = async (data: INotification) => {
    const result = await notificationModel.create(data);
    return result;
};

export const markAsReadAllNotification = async (
    dbId: Types.ObjectId | string,
) => {
    const result = await notificationModel
        .updateMany(
            {
                user: dbId,
                marked: false,
            },
            {
                $set: {
                    marked: true,
                },
            },
        )
        .exec();

    return result;
};
