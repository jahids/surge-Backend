import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";

// import Multer from 'multer';

import { ApiSuccess } from "../../utils/ApiSuccess";
import { handleUpload } from "../../services/Cloudinary.service";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import { updateUserPfp } from "../../models/user.model";

export async function uploadFileToCloud(req: any, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).send(ApiError("no file found!"));
        }
        const dbId = (req as ICustomRequest).dbId;

        const inBase64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + inBase64;
        const { url } = await handleUpload(dataURI);
        updateUserPfp(dbId, url);
        return res.json(ApiSuccess({ url }));
    } catch (error) {
        console.log(error);
        res.send({
            message: (error as Error).message,
        });
    }
}
