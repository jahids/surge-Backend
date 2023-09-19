import { Router, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";

const tradeOrder = Router();

tradeOrder.get("/", (req: Request, res: Response) => {
    try {
        const getUpdate = "test function";
    } catch (error) {
        return res.status(500).send(ApiError((error as Error).message));
    }
});
