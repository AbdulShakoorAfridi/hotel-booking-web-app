import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/globalErrorHandlingMiddleware.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

//  Rate Limiting

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(globalRateLimiter);

// Body Parsers
app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

// Cookies
app.use(cookieParser());

//  Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StayBook API is running",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// API Root
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to StayBook API",
    version: "v1",
  });
});

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
