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
import passport from "./config/passport.js";
import "express-async-errors";

const app = express();

if (config.env !== "production") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitizer());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", apiLimiter);
app.use("/api", routes);

app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
