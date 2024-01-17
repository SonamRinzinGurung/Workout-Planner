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
import session from "express-session";
import { OAuth2Client } from "google-auth-library";

const app = express();

if (config.env !== "production") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitizer());
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/auth/", apiLimiter);
app.use("/api", routes);

app.use(errorHandlerMiddleware);
app.use(routeNotFoundMiddleware);

export default app;
