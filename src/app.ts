// Import packages onto app
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import http from "http";
import path from "node:path";
// Setup .env variables for app usage
dotenv.config();

// Import routes from the ./routes
import indexRouter from "./routes/index.router";
import { _corsConfig_ } from "./configs/cors.config";
import { connectToDatabase } from "./configs/db";
import { getAppPort } from "./utils/generic.utils";

// Setup constant variables
const PORT = getAppPort();
const frontendDist = path.join(__dirname, `../public`);
const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

// Init express app
const app: Application = express();

// Body parser
app.use(express.json());
//cookie parser

app.use(cookieParser());

// Detailed server logging

app.use(morgan("dev"));
app.use(express.static(frontendDist));
// Limit rate of requests
// Alternatively, you can pass through specific routes for different limits based on route

// app.use(
//   rateLimit({
//     windowMs: RATE_TIME_LIMIT * 60 * 1000,
//     max: RATE_REQUEST_LIMIT,
//   }),
// );

// Enable CORS

app.use(cors(_corsConfig_));

// Security Headers
app.use(helmet());

// Secure against param pollutions
app.use(hpp());

// Setup index routing
app.use("/api", indexRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Listen to specified port in .env or default 5000
const server = http.createServer(app);
async function startServer() {
    await connectToDatabase();
    server.listen(PORT, () => {
        console.clear();
        console.log(`Last Run : ${new Date().toLocaleTimeString()}`);
        console.log(`Server Started :  http://localhost:${PORT}`);
    });
}

startServer();
