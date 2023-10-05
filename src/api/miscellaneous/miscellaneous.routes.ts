import { Router } from "express";
import { uploadFileToCloud } from "./miscellaneous.controller";
import { multerUploader } from "../../middleware/multer.middleware";

export const miscellaneousRouter = Router();
miscellaneousRouter.post(
    "/file-up",
    multerUploader.single("file"),
    uploadFileToCloud,
);
