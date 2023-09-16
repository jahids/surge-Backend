// Import packages onto app
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Setup .env variables for app usage
dotenv.config();

// Import routes from the ./routes
import indexRouter from "./routes/index.router";
import { _corsConfig_ } from "./configs/cors.config";
import { connectToDatabase } from "./configs/db";

// Setup constant variables
const PORT = process.env.PORT || 5000;
const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

// Init express app
const app: Application = express();

// Body parser
app.use(express.json());

// Detailed server logging

app.use(morgan("dev"));

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

// Listen to specified port in .env or default 5000

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.clear();
        console.log(`Last Run : ${new Date().toLocaleTimeString()}`);
        console.log(`Server Started :  http://localhost:${PORT}`);
    });
}

startServer();
