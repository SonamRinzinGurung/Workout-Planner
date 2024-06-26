import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(path.resolve(), ".env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.string()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.string()
      .default(30)
      .description("days after which refresh tokens expire"),
    GOOGLE_CLIENT_ID: Joi.string()
      .required()
      .description("Google Console Client ID"),
    GOOGLE_CLIENT_SECRET: Joi.string()
      .required()
      .description("Google Console Client Secret"),
    SECRET: Joi.string().required().description("Secret for session"),
    HOST_ENDPOINT: Joi.string().description("end point of hosted server"),
    VERIFICATION_SECRET: Joi.string()
      .required()
      .description("Secret for email verification"),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASS: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,
  SECRET: envVars.SECRET,
  hosted_endpoint: envVars.HOST_ENDPOINT,
  verification_secret: envVars.VERIFICATION_SECRET,
  email: {
    email_host: envVars.EMAIL_HOST,
    email_user: envVars.EMAIL_USER,
    email_pass: envVars.EMAIL_PASS,
  },
};
