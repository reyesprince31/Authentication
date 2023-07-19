import GoogleStrategy from "passport-google-oauth20";
import { User } from "./schema.js";

export function setupPassport(passport) {
  // Configure Passport with the User model
  passport.use(User.createStrategy());
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  // Set up the Google strategy for Passport
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ googleID: profile.id }, (err, user) => {
          return cb(err, user);
        });
      }
    )
  );
}
