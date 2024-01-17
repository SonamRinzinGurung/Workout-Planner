import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";

const oAuth2Client = new OAuth2Client(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const getProfileInfo = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  const idToken = tokens.id_token;

  const ticket = await oAuth2Client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

export { getProfileInfo };
