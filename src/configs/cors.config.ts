import { CorsOptions } from "cors";
export const _corsConfig_: CorsOptions = {
    origin: true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};
