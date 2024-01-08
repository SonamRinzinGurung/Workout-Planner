import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import config from "./config.js";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUserObj = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }
        await User.create(newUserObj);
        done(null, newUserObj);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user data
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user data
  done(null, user);
});

export default passport;
