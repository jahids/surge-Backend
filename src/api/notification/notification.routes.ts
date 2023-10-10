import { Router } from "express";
import {
    getAllUnreadNotifications,
    markAllUnreadNotifications,
    postNewNotification,
} from "./notification.controller";

export const notificationRouter = Router();
notificationRouter.get(`/`, getAllUnreadNotifications);
notificationRouter.get("/mark-all", markAllUnreadNotifications);
notificationRouter.post("/post", postNewNotification);
