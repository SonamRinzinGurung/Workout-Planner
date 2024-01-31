import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import mongoSanitizer from "express-mongo-sanitize";
import morgan from "morgan";
import config from "./config/config.js";
import compression from "compression";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import routeNotFoundMiddleware from "./middlewares/route-not-found.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { OAuth2Client } from "google-auth-library";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

if (config.env !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitizer());
app.use(
  cors({
    origin:
      config.env === "development"
        ? ["http://localhost:5173", "http://192.168.1.67:5173"]
        : config.hosted_endpoint,
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oAuth2Client = new OAuth2Client(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

app.use("/api/auth/", apiLimiter);
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.use(errorHandlerMiddleware);
app.use(routeNotFoundMiddleware);

export default app;
