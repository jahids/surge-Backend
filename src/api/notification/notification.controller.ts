import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import {
    getUnreadNotification,
    markAsReadAllNotification,
} from "../../models/notification.model";
export const getAllUnreadNotifications = async (
    req: Request,
    res: Response,
) => {
    try {
        const dbId = (req as ICustomRequest).dbId;
        const result = await getUnreadNotification(dbId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
export const markAllUnreadNotifications = async (
    req: Request,
    res: Response,
) => {
    try {
        const dbId = (req as ICustomRequest).dbId;
        const result = await markAsReadAllNotification(dbId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
export const postNewNotification = async (req: Request, res: Response) => {
    try {
        const dbId = (req as ICustomRequest).dbId;
        const result = await markAsReadAllNotification(dbId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};
