import Multer, { memoryStorage } from "multer";
const storage = memoryStorage();
export const multerUploader = Multer({
    storage,
});
